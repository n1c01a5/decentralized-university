import EmbarkJS from 'Embark/EmbarkJS';
import SimpleStorage from 'Embark/contracts/SimpleStorage';
import React from 'react';
import bs58 from 'bs58';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';

class Blockchain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      courseAdd: "QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j",
      courseGet: "",
      course: 0,
      logs: []
    }
  }

  ipfsHashToBytes32(ipfs_hash) {
    var h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '');
    if (h.length != 64) {
        console.log('invalid ipfs format', ipfs_hash, h);
        return null;
    }
    return '0x' + h;
  }

  bytes32ToIPFSHash(hash_hex) {
    //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
    var buf = new Buffer(hash_hex.replace(/^0x/, '1220'), 'hex')
    return bs58.encode(buf)
  }

  handleChangeCourse(e) {
    this.setState({ courseAdd: e.target.value });
  }

  handleChangeCourseGet(e) {
    this.setState({ course: e.target.value });
  }

  checkEnter(e, func) {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    func.apply(this, [e]);
  }

  addCourse(e) {
    e.preventDefault();

    SimpleStorage.methods.addCourse(this.ipfsHashToBytes32(this.state.courseAdd)).send();
    this._addToLog("SimpleStorage.methods.addCourse(" + this.state.courseAdd + ").send()");
  }

  getValue(e) {
    e.preventDefault();

    SimpleStorage.methods.get().call().then(_value => this.setState({ valueGet: _value }));
    this._addToLog("SimpleStorage.methods.get(console.log)");
  }

  getCourse(e) {
    e.preventDefault();

    SimpleStorage.methods.getCourse(this.state.course).call().then(_value => this.setState({ courseGet: this.bytes32ToIPFSHash(_value) }));
    this._addToLog("SimpleStorage.methods.getCourse(" + this.state.course + ")");
  }

  _addToLog(txt) {
    this.state.logs.push(txt);
    this.setState({ logs: this.state.logs });
  }

  render() {
    return (<React.Fragment>
        <h3> 1. Add course</h3>
        <Form inline onKeyDown={(e) => this.checkEnter(e, this.setValue)}>
          <FormGroup>
            <FormControl
              type="text"
              defaultValue="hash course"
              onChange={(e) => this.handleChangeCourse(e)}/>
            <Button bsStyle="primary" onClick={(e) => this.addCourse(e)}>Hash course</Button>
            <HelpBlock></HelpBlock>
          </FormGroup>
        </Form>

        <h3> 2. Get course</h3>
        <Form inline>
          <FormGroup>
            <FormControl
              type="text"
              defaultValue="id course"
              onChange={(e) => this.handleChangeCourseGet(e)}/>
            <HelpBlock><span className="value">Course {this.state.course}: {this.state.courseGet}</span></HelpBlock>
            <Button bsStyle="primary" onClick={(e) => this.getCourse(e)}>Get Course</Button>
          </FormGroup>
        </Form>

        <h3> 3. Contract Calls </h3>
        <p>Javascript calls being made: </p>
        <div className="logs">
          {
            this.state.logs.map((item, i) => <p key={i}>{item}</p>)
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Blockchain;
