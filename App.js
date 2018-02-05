import React from 'react';
import { AsyncStorage, Image, Keyboard, Navigator, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Body, Card, CardItem, Container, Content, Form, H3, Header, Icon, Input, Item, Left, Picker, Right, Text, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Expo from 'expo';

var RequestURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=300';

var imageURL = './icons/CUSTOM.png';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      rateCustom1: '',
      rateCustomPrint1: '',
      amountCustom1: '0',
      amountCustom2: '0',
      amountCustom3: '0',
      amountCustom4: '0',
      amountCustom5: '0',
      amountCustom6: '0',
      valueCustom1: '0',
      valueCustom2: '0',
      valueCustom3: '0',
      valueCustom4: '0',
      valueCustom5: '0',
      valueCustom6: '0',
      valueAll: '',
      apiData: 'nothing yet',
      selection1: 'BTC',
      selection2: 'BTC',
      selection3: 'BTC',
      selection4: 'BTC',
      selection5: 'BTC',
      selection6: 'BTC',
      coin1: true,
      coin2: false,
      coin3: false,
      coin4: false,
      coin5: false,
      coin6: false,
      buttons1: true,
      buttons2: false,
      buttons3: false,
      buttons4: false,
      buttons5: false,
      buttons6: false,
      loading: true
    };

    this.handleChangeSelection1 = this.handleChangeSelection1.bind(this);
    this.handleChangeSelection2 = this.handleChangeSelection2.bind(this);
    this.handleChangeSelection3 = this.handleChangeSelection3.bind(this);
    this.handleChangeSelection4 = this.handleChangeSelection4.bind(this);
    this.handleChangeSelection5 = this.handleChangeSelection5.bind(this);
    this.handleChangeSelection6 = this.handleChangeSelection6.bind(this);

    this.handleAddCoin2 = this.handleAddCoin2.bind(this);
    this.handleAddCoin3 = this.handleAddCoin3.bind(this);
    this.handleAddCoin4 = this.handleAddCoin4.bind(this);
    this.handleAddCoin5 = this.handleAddCoin5.bind(this);
    this.handleAddCoin6 = this.handleAddCoin6.bind(this);

    this.handleRemoveCoin2 = this.handleRemoveCoin2.bind(this);
    this.handleRemoveCoin3 = this.handleRemoveCoin3.bind(this);
    this.handleRemoveCoin4 = this.handleRemoveCoin4.bind(this);
    this.handleRemoveCoin5 = this.handleRemoveCoin5.bind(this);
    this.handleRemoveCoin6 = this.handleRemoveCoin6.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.saveData = this.saveData.bind(this);
  }

  //load font for native-base
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading: false});
  }

  //calling API
  componentDidMount() {
    this.fetchData();
  }

  //fetch data from API
  fetchData() {
    fetch(RequestURL)
      .then((result) => result.json())
      .then((res) => {
        this.setState({
          apiData: res
        });
        console.log('API data is here');
      })
  }

  //handling the selction of Dropdown
  handleChangeSelection1(value: string) {
    this.setState({
      selection1: value
    });
  }

  handleChangeSelection2(value: string) {
    this.setState({
      selection2: value
    });
  }

  handleChangeSelection3(value: string) {
    this.setState({
      selection3: value
    });
  }

  handleChangeSelection4(value: string) {
    this.setState({
      selection4: value
    });
  }

  handleChangeSelection5(value: string) {
    this.setState({
      selection5: value
    });
  }

  handleChangeSelection6(value: string) {
    this.setState({
      selection6: value
    });
  }
  //adding coins, we start at 2 because 1 is always there
  handleAddCoin2() {
    this.setState({
      coin2: true,
      buttons1: false,
      buttons2: true
    });
  }

  handleAddCoin3(){
    this.setState({
      coin3: true,
      buttons2: false,
      buttons3: true
    });
  }

  handleAddCoin4() {
    this.setState({
      coin4: true,
      buttons3: false,
      buttons4: true
    });
  }

  handleAddCoin5() {
    this.setState({
      coin5: true,
      buttons4: false,
      buttons5: true
    });
  }

  handleAddCoin6() {
    this.setState({
      coin6: true,
      buttons5: false,
      buttons6: true
    });
  }

  //removing coins, we can not remove coin 1
  handleRemoveCoin2() {
    this.setState({
      coin2: false,
      buttons2: false,
      buttons1: true,
      valueCustom2: '0'
    });
  }

  handleRemoveCoin3() {
    this.setState({
      coin3: false,
      buttons3: false,
      buttons2: true
    });
  }

  handleRemoveCoin4() {
    this.setState({
      coin4: false,
      buttons4: false,
      buttons3: true
    });
  }

  handleRemoveCoin5() {
    this.setState({
      coin5: false,
      buttons5: false,
      buttons4: true
    });
  }

  handleRemoveCoin6() {
    this.setState({
      coin6: false,
      buttons6: false,
      buttons5: true
    });
  }

  //calculate
  handleSubmit() {
    console.log('Button clicked');

    //calculate Custom1
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection1) {
        var rateCustom1 = this.state.apiData[i].price_usd;
        var rateCustomPrint1 = ('($ ' + rateCustom1 + ')');
        const resultCalcRawCustom1 = parseFloat(rateCustom1) * parseFloat(this.state.amountCustom1);
        const resultCalcCustom1 = resultCalcRawCustom1.toFixed(2);
        console.log('Custom choice is ' + this.state.selection1 + " | Rate: " + rateCustom1 + " | " + resultCalcRawCustom1 + " | You have " + this.state.selection1 + " in worth of " + resultCalcCustom1 + "Dollar");
        this.setState({
          rateCustom1: rateCustom1,
          rateCustomPrint1: rateCustomPrint1,
          valueCustom1: resultCalcCustom1
        });
      }
    };
    //calculate Custom2
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection2) {
        var rateCustom2 = this.state.apiData[i].price_usd;
        var rateCustomPrint2 = ('($ ' + rateCustom2 + ')');
        const resultCalcRawCustom2 = parseFloat(rateCustom2) * parseFloat(this.state.amountCustom2);
        const resultCalcCustom2 = resultCalcRawCustom2.toFixed(2);
        console.log('Custom choice is ' + this.state.selection2 + " | Rate: " + rateCustom2 + " | " + resultCalcRawCustom2 + " | You have " + this.state.selection2 + " in worth of " + resultCalcCustom2 + "Dollar");
        this.setState({
          rateCustom2: rateCustom2,
          rateCustomPrint2: rateCustomPrint2,
          valueCustom2: resultCalcCustom2
        });
      }
    };
    //calculate Custom3
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection3) {
        var rateCustom3 = this.state.apiData[i].price_usd;
        var rateCustomPrint3 = ('($ ' + rateCustom3 + ')');
        const resultCalcRawCustom3 = parseFloat(rateCustom3) * parseFloat(this.state.amountCustom3);
        const resultCalcCustom3 = resultCalcRawCustom3.toFixed(2);
        console.log('Custom choice is ' + this.state.selection3 + " | Rate: " + rateCustom3 + " | " + resultCalcRawCustom3 + " | You have " + this.state.selection3 + " in worth of " + resultCalcCustom3 + "Dollar");
        this.setState({
          rateCustom3: rateCustom3,
          rateCustomPrint3: rateCustomPrint3,
          valueCustom3: resultCalcCustom3
        });
      }
    };
    //calculate Custom4
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection4) {
        var rateCustom4 = this.state.apiData[i].price_usd;
        var rateCustomPrint4 = ('($ ' + rateCustom4 + ')');
        const resultCalcRawCustom4 = parseFloat(rateCustom4) * parseFloat(this.state.amountCustom4);
        const resultCalcCustom4 = resultCalcRawCustom4.toFixed(2);
        console.log('Custom choice is ' + this.state.selection4 + " | Rate: " + rateCustom4 + " | " + resultCalcRawCustom4 + " | You have " + this.state.selection4 + " in worth of " + resultCalcCustom4 + "Dollar");
        this.setState({
          rateCustom4: rateCustom4,
          rateCustomPrint4: rateCustomPrint4,
          valueCustom4: resultCalcCustom4
        });
      }
    };
    //calculate Custom5
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection5) {
        var rateCustom5 = this.state.apiData[i].price_usd;
        var rateCustomPrint5 = ('($ ' + rateCustom5 + ')');
        const resultCalcRawCustom5 = parseFloat(rateCustom5) * parseFloat(this.state.amountCustom5);
        const resultCalcCustom5 = resultCalcRawCustom5.toFixed(2);
        console.log('Custom choice is ' + this.state.selection5 + " | Rate: " + rateCustom5 + " | " + resultCalcRawCustom5 + " | You have " + this.state.selection5 + " in worth of " + resultCalcCustom5 + "Dollar");
        this.setState({
          rateCustom5: rateCustom5,
          rateCustomPrint5: rateCustomPrint5,
          valueCustom5: resultCalcCustom5
        });
      }
    };
    //calculate Custom6
    for(var i = 0; i < this.state.apiData.length; i++) {
      if(this.state.apiData[i].symbol == this.state.selection6) {
        var rateCustom6 = this.state.apiData[i].price_usd;
        var rateCustomPrint6 = ('($ ' + rateCustom6 + ')');
        const resultCalcRawCustom6 = parseFloat(rateCustom6) * parseFloat(this.state.amountCustom6);
        const resultCalcCustom6 = resultCalcRawCustom6.toFixed(2);
        console.log('Custom choice is ' + this.state.selection6 + " | Rate: " + rateCustom6 + " | " + resultCalcRawCustom6 + " | You have " + this.state.selection6 + " in worth of " + resultCalcCustom6 + "Dollar");
        this.setState({
          rateCustom6: rateCustom6,
          rateCustomPrint6: rateCustomPrint6,
          valueCustom6: resultCalcCustom6
        });
      }
    };
    var valueAll = (
      Number(this.state.valueCustom1) +
      Number(this.state.valueCustom2) +
      Number(this.state.valueCustom3) +
      Number(this.state.valueCustom4) +
      Number(this.state.valueCustom5) +
      Number(this.state.valueCustom6)).toFixed(2);
    this.setState({
      valueAll: valueAll
    });
    console.log('this.state.valueAll is: ', this.state.valueAll)

    Keyboard.dismiss();
  };

  //safe data to store
  saveData() {
    let saveAmounts = {
      DRGN: this.state.amountDRGN,
    }
    AsyncStorage.setItem('savedAmounts', JSON.stringify(saveAmounts));
    console.log('Saved is now: ', saveAmounts );
    alert('Data is saved')
  }

  //get data from store
  displayData = async () => {
    try {
      let savedAmounts = await AsyncStorage.getItem('savedAmounts');
      let parsed = JSON.parse(savedAmounts);
      console.log('parsed is: ', parsed);
      console.log('parsed.DRGN is: ', parsed.DRGN);
      this.setState({
        amountDRGN: parsed.DRGN
      });
    }
    catch(error) {
      alert(error);
    }
  }

  render() {
    //waiting for font to load
    if(this.state.loading) {
      return <Expo.AppLoading />;
    }

    var calcAll = (
      Number(this.state.valueCustom1) +
      Number(this.state.valueCustom2) +
      Number(this.state.valueCustom3) +
      Number(this.state.valueCustom4) +
      Number(this.state.valueCustom5) +
      Number(this.state.valueCustom6)).toFixed(2);

    return (
      <Container>
        <Header style={{ backgroundColor: '#2196F3'}}>
         <Body>
           <Title>Crypto Calculator</Title>
         </Body>
       </Header>
        <Content style={{ marginLeft: 10, marginRight: 10 }}>
          {
            this.state.coin1?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>1. {this.state.selection1}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection1}
                            onValueChange={this.handleChangeSelection1}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint1}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom1}
                            onChangeText = {(amountCustom1) => this.setState({amountCustom1})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom1}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={70}></Col>
            {
              this.state.buttons1?
                <Button light onPress={this.handleAddCoin2}><Icon name="md-add" /></Button>
                :
                <Col size={30}></Col>
            }
          </Grid>
          {
            this.state.coin2?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>2. {this.state.selection2}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection2}
                            onValueChange={this.handleChangeSelection2}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint2}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom2}
                            onChangeText = {(amountCustom2) => this.setState({amountCustom2})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom2}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={40}></Col>
            {
              this.state.buttons2?
                <Button light onPress={this.handleRemoveCoin2}><Icon name="md-close" /></Button>
                :
                  <Col></Col>
            }
            <Col size={2}></Col>
            {
              this.state.buttons2?
                <Button light onPress={this.handleAddCoin3}><Icon name="md-add" /></Button>
                :
                <Col></Col>
            }
          </Grid>
          {
            this.state.coin3?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>3. {this.state.selection3}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection3}
                            onValueChange={this.handleChangeSelection3}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint3}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom3}
                            onChangeText = {(amountCustom3) => this.setState({amountCustom3})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom3}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={40}></Col>
            {
              this.state.buttons3?
                <Button light onPress={this.handleRemoveCoin3}><Icon name="md-close" /></Button>
                :
                  <Col></Col>
            }
            <Col size={2}></Col>
            {
              this.state.buttons3?
                <Button light onPress={this.handleAddCoin4}><Icon name="md-add" /></Button>
                :
                <Col></Col>
            }
          </Grid>
          {
            this.state.coin4?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>4. {this.state.selection4}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection4}
                            onValueChange={this.handleChangeSelection4}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint4}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom4}
                            onChangeText = {(amountCustom4) => this.setState({amountCustom4})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom4}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={40}></Col>
            {
              this.state.buttons4?
                <Button light onPress={this.handleRemoveCoin4}><Icon name="md-close" /></Button>
                :
                  <Col></Col>
            }
            <Col size={2}></Col>
            {
              this.state.buttons4?
                <Button light onPress={this.handleAddCoin5}><Icon name="md-add" /></Button>
                :
                <Col></Col>
            }
          </Grid>
          {
            this.state.coin5?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>5. {this.state.selection5}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection5}
                            onValueChange={this.handleChangeSelection5}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint5}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom5}
                            onChangeText = {(amountCustom5) => this.setState({amountCustom5})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom5}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={40}></Col>
            {
              this.state.buttons5?
                <Button light onPress={this.handleRemoveCoin5}><Icon name="md-close" /></Button>
                :
                  <Col></Col>
            }
            <Col size={2}></Col>
            {
              this.state.buttons5?
                <Button light onPress={this.handleAddCoin6}><Icon name="md-add" /></Button>
                :
                <Col></Col>
            }
          </Grid>
          {
            this.state.coin6?
              <Card>
                <CardItem>
                  <Body>
                    <Grid>
                      <Col size={50}>
                        <H3>6. {this.state.selection6}</H3>
                        <Form>
                          <Picker
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.selection6}
                            onValueChange={this.handleChangeSelection6}
                          >
                            <Item label="0x" value="XRZ" />
                            <Item label="ATMChain" value="ATM" />
                            <Item label="Achain" value="ACT" />
                            <Item label="AdEx" value="ADX" />
                            <Item label="adToken" value="ADT" />
                            <Item label="aelf" value="ELF" />
                            <Item label="Aeon" value="AEON" />
                            <Item label="Aeternity" value="AE" />
                            <Item label="Agoras Tokens" value="AGRS" />
                            <Item label="Agrello" value="DLT" />
                            <Item label="Aion" value="AION" />
                            <Item label="AirSwap" value="AST" />
                            <Item label="Ambrosus" value="AMB" />
                            <Item label="AppCoins" value="APPC" />
                            <Item label="Aragon" value="ANT" />
                            <Item label="Ardor" value="ARDR" />
                            <Item label="Ark" value="ARK" />
                            <Item label="Asch" value="XAS" />
                            <Item label="Augur" value="REP" />
                            <Item label="BLOCKv" value="VEE" />
                            <Item label="Bancor" value="BNT" />
                            <Item label="Basic Attention Token" value="BAT" />
                            <Item label="Bibox Token" value="BIX" />
                            <Item label="Binance Coin" value="BNB" />
                            <Item label="BitBay" value="BAY" />
                            <Item label="BitClave" value="CAT" />
                            <Item label="BitConnect" value="BCC" />
                            <Item label="bitCNY" value="BITCNY" />
                            <Item label="BitDegree" value="BDG" />
                            <Item label="BitShares" value="BTS" />
                            <Item label="Bitcoin" value="BTC" />
                            <Item label="Bitcoin Cash" value="BCH" />
                            <Item label="Bitcoin Gold" value="BTG" />
                            <Item label="BitcoinDark" value="BTCD" />
                            <Item label="Bitcore" value="BTX" />
                            <Item label="BlackCoin" value="BLK" />
                            <Item label="BlockMason Credit Protocol" value="BCPT" />
                            <Item label="Blocknet" value="BLOCK" />
                            <Item label="Blocktix" value="TIX" />
                            <Item label="Bloom" value="BLT" />
                            <Item label="Bread" value="BRD" />
                            <Item label="BridgeCoin" value="BCO" />
                            <Item label="Burst" value="BURST" />
                            <Item label="Byteball Bytes" value="GBYTE" />
                            <Item label="Bytecoin" value="BCN" />
                            <Item label="Bytom" value="BTM" />
                            <Item label="COSS" value="COSS" />
                            <Item label="CanYaCoin" value="CAN" />
                            <Item label="Cappasity" value="CAPP" />
                            <Item label="Cardano" value="ADA" />
                            <Item label="Centra" value="CTR" />
                            <Item label="ChainLink" value="LINK" />
                            <Item label="Cindicator" value="CND" />
                            <Item label="Civic" value="CVC" />
                            <Item label="CloakCoin" value="CLOAK" />
                            <Item label="Cobinhood" value="COB" />
                            <Item label="Cofound.it" value="CFI" />
                            <Item label="CoinDash" value="CDT" />
                            <Item label="Counterparty" value="XCP" />
                            <Item label="Covesting" value="COV" />
                            <Item label="Crown" value="CRW" />
                            <Item label="Cryptonex" value="CNX" />
                            <Item label="CyberMiles" value="CMT" />
                            <Item label="DECENT" value="DCT" />
                            <Item label="DEW" value="DEW" />
                            <Item label="Dash" value="DASH" />
                            <Item label="Datum" value="DAT" />
                            <Item label="Decentraland" value="MANA" />
                            <Item label="Decision Token" value="HST" />
                            <Item label="Decred" value="DCR" />
                            <Item label="DeepBrain Chain" value="DBC" />
                            <Item label="DeepOnion" value="ONION" />
                            <Item label="Delphy" value="DPY" />
                            <Item label="Dent" value="DENT" />
                            <Item label="Dentacoin" value="DCN" />
                            <Item label="Diamond" value="DMD" />
                            <Item label="DigiByte" value="DGB" />
                            <Item label="DigitalNote" value="XDN" />
                            <Item label="DigixDAO" value="DGD" />
                            <Item label="Dimecoin" value="DIME" />
                            <Item label="district0x" value="DNT" />
                            <Item label="Divi" value="DIVX" />
                            <Item label="Dogecoin" value="DOGE" />
                            <Item label="DomRaider" value="DRT" />
                            <Item label="Dragonchain" value="DRGN" />
                            <Item label="Dynamic Trading Rights" value="DTR" />
                            <Item label="E-coin" value="ECN" />
                            <Item label="ECC" value="ECC" />
                            <Item label="EOS" value="EOS" />
                            <Item label="ETHLend" value="LEND" />
                            <Item label="Edgeless" value="EDG" />
                            <Item label="Eidoo" value="EDO" />
                            <Item label="Einsteinium" value="EMC2" />
                            <Item label="Elastic" value="XEL" />
                            <Item label="Electra" value="ECA" />
                            <Item label="Electroneum" value="ETN" />
                            <Item label="Emercoin" value="EMC" />
                            <Item label="EncrypGen" value="DNA" />
                            <Item label="Enigma" value="ENG" />
                            <Item label="Enjin Coin" value="ENJ" />
                            <Item label="Ethereum" value="ETH" />
                            <Item label="Ethereum Classic" value="ETC" />
                            <Item label="Etherparty" value="FUEL" />
                            <Item label="Ethos" value="ETHOS" />
                            <Item label="Everex" value="EVX" />
                            <Item label="Expanse" value="EXP" />
                            <Item label="Experience Points" value="XP" />
                            <Item label="Factom" value="FCT" />
                            <Item label="FairCoin" value="FAIR" />
                            <Item label="Feathercoin" value="FTC" />
                            <Item label="FirstBlood" value="1ST" />
                            <Item label="Flash" value="FLASH" />
                            <Item label="FunFair" value="FUN" />
                            <Item label="GXShares" value="GXS" />
                            <Item label="Game.com" value="GTC" />
                            <Item label="GameCredits" value="GAME" />
                            <Item label="Gas" value="GAS" />
                            <Item label="Genesis Vision" value="GVT" />
                            <Item label="Gifto" value="GTO" />
                            <Item label="Gnosis" value="GNO" />
                            <Item label="Golem" value="GNT" />
                            <Item label="Grid+" value="GRID" />
                            <Item label="GridCoin" value="GRC" />
                            <Item label="Groestlcoin" value="GRS" />
                            <Item label="Gulden" value="NLG" />
                            <Item label="HTMLCOIN" value="HTML" />
                            <Item label="HelloGold" value="HGT" />
                            <Item label="HempCoin" value="THC" />
                            <Item label="High Performance Blockchain" value="HPB" />
                            <Item label="Hive" value="HVN" />
                            <Item label="Hshare" value="HSR" />
                            <Item label="Humaniq" value="HMQ" />
                            <Item label="I/O Coin" value="IOC" />
                            <Item label="ICON" value="ICX" />
                            <Item label="iExec RLC" value="RLC" />
                            <Item label="INS Ecosystem" value="INS" />
                            <Item label="ION" value="ION" />
                            <Item label="IOTA" value="MIOTA" />
                            <Item label="Iconomi" value="ICN" />
                            <Item label="Ink" value="INK" />
                            <Item label="Internet Node Token" value="INT" />
                            <Item label="IoT Chain" value="ITC" />
                            <Item label="iXledger" value="IXT" />
                            <Item label="Jinn" value="JINN" />
                            <Item label="Karma" value="KRM" />
                            <Item label="Kin" value="KIN" />
                            <Item label="Komodo" value="KMD" />
                            <Item label="KuCoin Shares" value="KCS" />
                            <Item label="Kyber Network" value="KNC" />
                            <Item label="LAToken" value="LA" />
                            <Item label="LBRY Credits" value="LBC" />
                            <Item label="Lamden" value="TAU" />
                            <Item label="Lisk" value="LSK" />
                            <Item label="Litecoin" value="LTC" />
                            <Item label="Loopring" value="LRC" />
                            <Item label="Lunyr" value="LUN" />
                            <Item label="Lykke" value="LKK" />
                            <Item label="MaidSafeCoin" value="MAID" />
                            <Item label="Maker" value="MKR" />
                            <Item label="Matchpool" value="GUP" />
                            <Item label="MediBloc" value="MED" />
                            <Item label="MediShares" value="MDS" />
                            <Item label="Melon" value="MLN" />
                            <Item label="Mercury" value="MER" />
                            <Item label="Metal" value="MTL" />
                            <Item label="Metaverse ETP" value="ETP" />
                            <Item label="MinexCoin" value="MNX" />
                            <Item label="MobileGo" value="MGO" />
                            <Item label="Modum" value="MOD" />
                            <Item label="Moeda Loyalty Points" value="MDA" />
                            <Item label="MonaCoin" value="MONA" />
                            <Item label="Monaco" value="MCO" />
                            <Item label="Monero" value="XMR" />
                            <Item label="Monetha" value="MTH" />
                            <Item label="Mooncoin" value="MOON" />
                            <Item label="Mothership" value="MSP" />
                            <Item label="NAGA" value="NGC" />
                            <Item label="NAV Coin" value="NAV" />
                            <Item label="NEM" value="XEM" />
                            <Item label="NEO" value="NEO" />
                            <Item label="NVO" value="NVST" />
                            <Item label="Namecoin" value="NMC" />
                            <Item label="Neblio" value="NEBL" />
                            <Item label="Nebulas" value="NAS" />
                            <Item label="Neumark" value="NEU" />
                            <Item label="Nexus" value="NXS" />
                            <Item label="Nimiq" value="NET" />
                            <Item label="NuShares" value="NSR" />
                            <Item label="Nuls" value="NULS" />
                            <Item label="Numeraire" value="NMR" />
                            <Item label="Nxt" value="NXT" />
                            <Item label="OmiseGO" value="OMG" />
                            <Item label="Oyster" value="PRL" />
                            <Item label="PACcoin" value="PAC" />
                            <Item label="PIVX" value="PIVX" />
                            <Item label="Particl" value="PART" />
                            <Item label="Pascal Coin" value="PASC" />
                            <Item label="PayPie" value="PPP" />
                            <Item label="Paypex" value="PAYX" />
                            <Item label="Peercoin" value="PPC" />
                            <Item label="Peerplays" value="PPY" />
                            <Item label="Pepe Cash" value="PEPECASH" />
                            <Item label="Pillar" value="PLR" />
                            <Item label="Po.et" value="POE" />
                            <Item label="Populous" value="PPT" />
                            <Item label="PotCoin" value="POT" />
                            <Item label="Power Ledger" value="POWR" />
                            <Item label="Presearch" value="PRS" />
                            <Item label="Propy" value="PRO" />
                            <Item label="Pura" value="PURA" />
                            <Item label="QASH" value="QASH" />
                            <Item label="QLINK" value="QLC" />
                            <Item label="Qtum" value="QTUM" />
                            <Item label="Quantstamp" value="QSP" />
                            <Item label="Quantum Resistant Ledger" value="QRL" />
                            <Item label="RChain" value="RHOC" />
                            <Item label="RaiBlocks" value="XRB" />
                            <Item label="Raiden Network Token" value="RDN" />
                            <Item label="Red Pulse" value="RPX" />
                            <Item label="ReddCoin" value="RDD" />
                            <Item label="Request Network" value="REQ" />
                            <Item label="Revain" value="R" />
                            <Item label="Ripio Credit Network" value="RCN" />
                            <Item label="Ripple" value="XRP" />
                            <Item label="Rise" value="RISE" />
                            <Item label="Rivetz" value="RVT" />
                            <Item label="SALT" value="SALT" />
                            <Item label="SHIELD" value="XSH" />
                            <Item label="SIBCoin" value="SIB" />
                            <Item label="SIRIN LABS Token" value="SRN" />
                            <Item label="SONM" value="SNM" />
                            <Item label="Safe Exchange Coin" value="SAFEX" />
                            <Item label="SaluS" value="SLS" />
                            <Item label="Santiment Network Token" value="SAN" />
                            <Item label="Selfkey" value="KEY" />
                            <Item label="Shift" value="SHIFT" />
                            <Item label="Siacoin" value="SC" />
                            <Item label="Simple Token" value="OST" />
                            <Item label="SingularDTV" value="SNGLS" />
                            <Item label="Skycoin" value="SKY" />
                            <Item label="SmartCash" value="SMART" />
                            <Item label="SolarCoin" value="SLR" />
                            <Item label="SophiaTX" value="SPHTX" />
                            <Item label="SpankChain" value="SPANK" />
                            <Item label="Spectrecoin" value="XSPEC" />
                            <Item label="Status" value="SNT" />
                            <Item label="Steem" value="STEEM" />
                            <Item label="Steem Dollars" value="SBD" />
                            <Item label="Stellar" value="XLM" />
                            <Item label="Storj" value="STORJ" />
                            <Item label="Storm" value="STORM" />
                            <Item label="Stratis" value="STRAT" />
                            <Item label="Streamr DATAcoin" value="DATA" />
                            <Item label="Substratum" value="SUB" />
                            <Item label="SunContract" value="SNC" />
                            <Item label="SuperNET" value="UNITY" />
                            <Item label="Swarm City" value="SWT" />
                            <Item label="Synereo" value="AMP" />
                            <Item label="Syscoin" value="SYS" />
                            <Item label="TRON" value="TRX" />
                            <Item label="TaaS" value="TAAS" />
                            <Item label="Telcoin" value="TEL" />
                            <Item label="TenX" value="PAY" />
                            <Item label="Tether" value="USDT" />
                            <Item label="Theta Token" value="THETA" />
                            <Item label="Tierion" value="TNT" />
                            <Item label="Time New Bank" value="TNB" />
                            <Item label="TokenCard" value="TKN" />
                            <Item label="Trade Token" value="TIO" />
                            <Item label="Triggers" value="TRIG" />
                            <Item label="Trinity Network Credit" value="TNC" />
                            <Item label="UTRUST" value="UTK" />
                            <Item label="Ubiq" value="UBQ" />
                            <Item label="Unikoin Gold" value="UKG" />
                            <Item label="VIBE" value="VIBE" />
                            <Item label="VeChain" value="VEN" />
                            <Item label="Verge" value="XVG" />
                            <Item label="VeriCoin" value="VRC" />
                            <Item label="Veritaseum" value="VERI" />
                            <Item label="Vertcoin" value="VTC" />
                            <Item label="Viacoin" value="VIA" />
                            <Item label="Viberate" value="VIB" />
                            <Item label="Voxels" value="VOX" />
                            <Item label="WAX" value="WAX" />
                            <Item label="WaBi" value="WABI" />
                            <Item label="Wagerr" value="WGR" />
                            <Item label="Walton" value="WTC" />
                            <Item label="Waves" value="WAVES" />
                            <Item label="WeTrust" value="TRST" />
                            <Item label="WhiteCoin" value="XWC" />
                            <Item label="Wings" value="WINGS" />
                            <Item label="Worldcore" value="WRC" />
                            <Item label="XPlay" value="XPA" />
                            <Item label="XTRABYTES" value="XBY" />
                            <Item label="YOYOW" value="YOYOW" />
                            <Item label="ZClassic" value="ZCL" />
                            <Item label="ZCoin" value="XZC" />
                            <Item label="Zcash" value="ZEC" />
                            <Item label="ZenCash" value="ZEN" />
                            <Item label="Zeusshield" value="ZSC" />
                          </Picker>
                        </Form>
                        <Text>{this.state.rateCustomPrint6}</Text>
                      </Col>
                      <Col size={50}>
                        <Item regular>
                          <Input
                            value={this.state.amountCustom6}
                            onChangeText = {(amountCustom6) => this.setState({amountCustom6})}
                            placeholder='Enter your amount'
                            maxLength = {40}
                            keyboardType = 'numeric' />
                        </Item>
                        <H3 style={{ marginTop: 20, alignSelf: 'center'}}>
                          $ {this.state.valueCustom6}
                        </H3>
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              :
              <View></View>
          }
          <Grid>
            <Col size={40}></Col>
            {
              this.state.buttons6?
                <Button light onPress={this.handleRemoveCoin6}><Icon name="md-close" /></Button>
                :
                  <Col></Col>
            }
          </Grid>
          <View style={{ alignSelf: 'center', marginTop: 20 }}>
            <H3>All coins together: $ {calcAll}</H3>
          </View>
          <View style={{ alignSelf: 'center', marginTop: 20 }}>
            <Button style={{ backgroundColor: '#2196F3'}} onPress={this.handleSubmit} accessibilityLabel="Calculate the amount">
              <Text>Calculate</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  alignRight: {
    justifyContent: 'flex-end'
  }
});
