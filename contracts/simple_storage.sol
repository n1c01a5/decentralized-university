pragma solidity ^0.4.25;

contract SimpleStorage {
  uint public storedData;

  struct course {
    bytes32 hashCourse;
    address master;
    mapping (address => bytes) graduates;
  }

  course[] public courses;
  mapping (uint => address[]) public graduates;

  function addCourse(bytes32 _hashCourse) public { // ipfs hash
    courses.push(course(_hashCourse, msg.sender));
  }

  function blacklist(address _blacklistAdress, uint _isCourse) public {
    graduates[_isCourse].push(_blacklistAdress);
  }

  function getCourse(uint _idCourse) public returns (bytes32) {
    return courses[_idCourse].hashCourse;
  }

  function validateCertificate(uint idCourse, address _disciple, bytes _proofSuccessCourse) public {
    require(courses[idCourse].master == msg.sender, "must call by the instructor of the course");
    courses[idCourse].graduates[_disciple] = _proofSuccessCourse;
  }

  function checkCertification(uint _idCourse, address _disciple) public returns (bool) {
    bytes32 message = bytes32(uint256(_disciple) << 96);
    return recoverSigner(message, courses[_idCourse].graduates[_disciple]) == courses[_idCourse].master;
  }

  function recoverSigner(bytes32 message, bytes sig)
    internal
    pure
    returns (address)
  {
      uint8 v;
      bytes32 r;
      bytes32 s;

      (v, r, s) = splitSignature(sig);

      return ecrecover(message, v, r, s);
  }

    function splitSignature(bytes sig)
        internal
        pure
        returns (uint8, bytes32, bytes32)
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }
}
