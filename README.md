# decentralized-university

Suite à ce meetup https://www.meetup.com/fr-FR/LearningGeeksNetwork/events/255717800/ l'idée était de faire une destop app avec embark + electronjs + ipfs.

Chose faite avec ce repo.

Quelques remarques:
Pour l'installation de embark bien vérifier d'avoir les dernières de nodeJs, npm, geth et ipfs.
Pour info, la team d'embark sur https://gitter.im/embark-framework/Lobby est très réactive.

Le but de cette dapp est de faire un MVP de faire une université décentralisé.

L'idée est que n'importe qui (maître) peut proposer des cours et certifier ses disciplines sur l'idée de Ernest Duarte.

L'interface permet de poster son cours sur IPFS via l'onglet "Publish on IPFS" puis après d'enregistrer le hash ipfs dans le smart contract decentralized university.

Dans le smart contract, il y a une fonction qui permet de certifier les disciples (je ne l'ai implémenté mais pas tester).

Le code est fait à l'arrache mais ca peut être une base pour faire un prototype.

```
cd decentralized-university
yarn
embark run
yarn start # sur un autre tab
```