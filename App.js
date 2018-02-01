import React from 'react';
import { AsyncStorage, Image, Keyboard, Navigator, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Body, Card, CardItem, Container, Content, Form, H3, Header, Icon, Input, Item, Left, Picker, Right, Text, Title} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Expo from 'expo';

var RequestURL = 'https://api.coinmarketcap.com/v1/ticker/?limit=300';

const coins = [
  {key: 'CUSTOM', text: 'Choose...', value: 'CUSTOM', picURL: 'custom'},
  {key: 'BTC', text: 'Bitcoin', value: 'BTC', picURL: 'btc'},
  {key: 'ETH', text: 'Ethereum', value: 'ETH', picURL: 'eth'},
  {key: 'XRP', text: 'Ripple', value: 'XRP', picURL: 'xrp'},
  {key: 'BCH', text: 'Bitcoin Cash', value: 'BCH', picURL: 'bch'},
  {key: 'ADA', text: 'Cardano', value: 'ADA', picURL: 'ada'},
  {key: 'LTC', text: 'Litecoin', value: 'LTC', picURL: 'ltc'},
  {key: 'XLM', text: 'Stellar', value: 'XLM', picURL: 'xlm'},
  {key: 'XEM', text: 'NEM', value: 'XEM', picURL: 'xem'},
  {key: 'EOS', text: 'EOS', value: 'EOS', picURL: 'eos'},
  {key: 'NEO', text: 'NEO', value: 'NEO', picURL: 'neo'},
  {key: 'MIOTA', text: 'IOTA', value: 'MIOTA', picURL: 'miota'},
  {key: 'DASH', text: 'Dash', value: 'DASH', picURL: 'dash'},
  {key: 'XMR', text: 'Monero', value: 'XMR', picURL: 'xmr'},
  {key: 'TRX', text: 'TRON', value: 'TRX', picURL: 'trx'},
  {key: 'BTG', text: 'Bitcoin Gold', value: 'BTG', picURL: 'btg'},
  {key: 'ICX', text: 'ICON', value: 'ICX', picURL: 'icx'},
  {key: 'QTUM', text: 'Qtum', value: 'QTUM', picURL: 'qtum'},
  {key: 'ETC', text: 'Ethereum Classic', value: 'ETC', picURL: 'etc'},
  {key: 'LSK', text: 'Lisk', value: 'LSK', picURL: 'lsk'},
  {key: 'VEN', text: 'VeChain', value: 'VEN', picURL: 'ven'},
  {key: 'XRB', text: 'RaiBlocks', value: 'XRB', picURL: 'xrb'},
  {key: 'PPT', text: 'Populous', value: 'PPT', picURL: 'ppt'},
  {key: 'OMG', text: 'OmiseGO', value: 'OMG', picURL: 'omg'},
  {key: 'USDT', text: 'Tether', value: 'USDT', picURL: 'usdt'},
  {key: 'ZEC', text: 'Zcash', value: 'ZEC', picURL: 'zec'},
  {key: 'XVG', text: 'Verge', value: 'XVG', picURL: 'xvg'},
  {key: 'BNB', text: 'Binance Coin', value: 'BNB', picURL: 'bnb'},
  {key: 'STRAT', text: 'Stratis', value: 'STRAT', picURL: 'strat'},
  {key: 'SC', text: 'Siacoin', value: 'SC', picURL: 'sc'},
  {key: 'BCN', text: 'Bytecoin', value: 'BCN', picURL: 'bcn'},
  {key: 'STEEM', text: 'Steem', value: 'STEEM', picURL: 'steem'},
  {key: 'ARDR', text: 'Ardor', value: 'ARDR', picURL: 'ardr'},
  {key: 'REP', text: 'Augur', value: 'REP', picURL: 'rep'},
  {key: 'SNT', text: 'Status', value: 'SNT', picURL: 'snt'},
  {key: 'MKR', text: 'Maker', value: 'MKR', picURL: 'mkr'},
  {key: 'BTS', text: 'BitShares', value: 'BTS', picURL: 'bts'},
  {key: 'ZRX', text: '0x', value: 'ZRX', picURL: 'zrx'},
  {key: 'WAVES', text: 'Waves', value: 'WAVES', picURL: 'waves'},
  {key: 'WTC', text: 'Walton', value: 'WTC', picURL: 'wtc'},
  {key: 'DOGE', text: 'Dogecoin', value: 'DOGE', picURL: 'doge'},
  {key: 'ETN', text: 'Electroneum', value: 'ETN', picURL: 'etn'},
  {key: 'KCS', text: 'KuCoin Shares', value: 'KCS', picURL: 'kcs'},
  {key: 'VERI', text: 'Veritaseum', value: 'VERI', picURL: 'veri'},
  {key: 'PIVX', text: 'PIVX', value: 'PIVX', picURL: 'pivx'},
  {key: 'KMD', text: 'Komodo', value: 'KMD', picURL: 'kmd'},
  {key: 'DCR', text: 'Decred', value: 'DCR', picURL: 'dcr'},
  {key: 'LRC', text: 'Loopring', value: 'LRC', picURL: 'lrc'},
  {key: 'ARK', text: 'Ark', value: 'ARK', picURL: 'ark'},
  {key: 'DCN', text: 'Dentacoin', value: 'DCN', picURL: 'dcn'},
  {key: 'DRGN', text: 'Dragonchain', value: 'DRGN', picURL: 'drgn'},
  {key: 'DGB', text: 'DigiByte', value: 'DGB', picURL: 'dgb'},
  {key: 'BAT', text: 'Basic Attention Token', value: 'BAT', picURL: 'bat'},
  {key: 'HSR', text: 'Hshare', value: 'HSR', picURL: 'hsr'},
  {key: 'QASH', text: 'QASH', value: 'QASH', picURL: 'qash'},
  {key: 'GNT', text: 'Golem', value: 'GNT', picURL: 'gnt'},
  {key: 'GBYTE', text: 'Byteball Bytes', value: 'GBYTE', picURL: 'gbyte'},
  {key: 'WAX', text: 'WAX', value: 'WAX', picURL: 'wax'},
  {key: 'KNC', text: 'Kyber Network', value: 'KNC', picURL: 'knc'},
  {key: 'SMART', text: 'SmartCash', value: 'SMART', picURL: 'smart'},
  {key: 'GAS', text: 'Gas', value: 'GAS', picURL: 'gas'},
  {key: 'FUN', text: 'FunFair', value: 'FUN', picURL: 'fun'},
  {key: 'ETHOS', text: 'Ethos', value: 'ETHOS', picURL: 'ethos'},
  {key: 'CND', text: 'Cindicator', value: 'CND', picURL: 'cnd'},
  {key: 'RHOC', text: 'RChain', value: 'RHOC', picURL: 'rhoc'},
  {key: 'FCT', text: 'Factom', value: 'FCT', picURL: 'fct'},
  {key: 'SALT', text: 'SALT', value: 'SALT', picURL: 'salt'},
  {key: 'POWR', text: 'Power Ledger', value: 'POWR', picURL: 'powr'},
  {key: 'DGD', text: 'DigixDAO', value: 'DGD', picURL: 'dgd'},
  {key: 'DENT', text: 'Dent', value: 'DENT', picURL: 'dent'},
  {key: 'CNX', text: 'Cryptonex', value: 'CNX', picURL: 'cnx'},
  {key: 'AION', text: 'Aion', value: 'AION', picURL: 'aion'},
  {key: 'ELF', text: 'aelf', value: 'ELF', picURL: 'elf'},
  {key: 'MONA', text: 'MonaCoin', value: 'MONA', picURL: 'mona'},
  {key: 'AE', text: 'Aeternity', value: 'AE', picURL: 'ae'},
  {key: 'BTM', text: 'Bytom', value: 'BTM', picURL: 'btm'},
  {key: 'SRN', text: 'SIRIN LABS Token', value: 'SRN', picURL: 'srn'},
  {key: 'KIN', text: 'Kin', value: 'KIN', picURL: 'kin'},
  {key: 'NXT', text: 'Nxt', value: 'NXT', picURL: 'nxt'},
  {key: 'NAS', text: 'Nebulas', value: 'NAS', picURL: 'nas'},
  {key: 'SYS', text: 'Syscoin', value: 'SYS', picURL: 'sys'},
  {key: 'ZCL', text: 'ZClassic', value: 'ZCL', picURL: 'zcl'},
  {key: 'RDD', text: 'ReddCoin', value: 'RDD', picURL: 'rdd'},
  {key: 'ENG', text: 'Enigma', value: 'ENG', picURL: 'eng'},
  {key: 'MAID', text: 'MaidSafeCoin', value: 'MAID', picURL: 'maid'},
  {key: 'REQ', text: 'Request Network', value: 'REQ', picURL: 'req'},
  {key: 'NXS', text: 'Nexus', value: 'NXS', picURL: 'nxs'},
  {key: 'LINK', text: 'ChainLink', value: 'LINK', picURL: 'link'},
  {key: 'XZC', text: 'ZCoin', value: 'XZC', picURL: 'xzc'},
  {key: 'GXS', text: 'GXShares', value: 'GXS', picURL: 'gxs'},
  {key: 'NEBL', text: 'Neblio', value: 'NEBL', picURL: 'nebl'},
  {key: 'BNT', text: 'Bancor', value: 'BNT', picURL: 'bnt'},
  {key: 'SUB', text: 'Substratum', value: 'SUB', picURL: 'sub'},
  {key: 'QSP', text: 'Quantstamp', value: 'QSP', picURL: 'qsp'},
  {key: 'MED', text: 'MediBloc', value: 'MED', picURL: 'med'},
  {key: 'XP', text: 'Experience Points', value: 'XP', picURL: 'xp'},
  {key: 'EMC', text: 'Emercoin', value: 'EMC', picURL: 'emc'},
  {key: 'PAY', text: 'TenX', value: 'PAY', picURL: 'pay'},
  {key: 'BTX', text: 'Bitcore', value: 'BTX', picURL: 'btx'},
  {key: 'CVC', text: 'Civic', value: 'CVC', picURL: 'cvc'},
  {key: 'GAME', text: 'GameCredits', value: 'GAME', picURL: 'game'},
  {key: 'PART', text: 'Particl', value: 'PART', picURL: 'part'},
  {key: 'XPA', text: 'XPlay', value: 'XPA', picURL: 'xpa'},
  {key: 'ICN', text: 'Iconomi', value: 'ICN', picURL: 'icn'},
  {key: 'PLR', text: 'Pillar', value: 'PLR', picURL: 'plr'},
  {key: 'POE', text: 'Po.et', value: 'POE', picURL: 'poe'},
  {key: 'GNO', text: 'Gnosis', value: 'GNO', picURL: 'gno'},
  {key: 'SKY', text: 'Skycoin', value: 'SKY', picURL: 'sky'},
  {key: 'TNB', text: 'Time New Bank', value: 'TNB', picURL: 'tnb'},
  {key: 'BTCD', text: 'BitcoinDark', value: 'BTCD', picURL: 'btcd'},
  {key: 'PAC', text: 'PACcoin', value: 'PAC', picURL: 'pac'},
  {key: 'RDN', text: 'Raiden Network Token', value: 'RDN', picURL: 'rdn'},
  {key: 'STORJ', text: 'Storj', value: 'STORJ', picURL: 'storj'},
  {key: 'XDN', text: 'DigitalNote', value: 'XDN', picURL: 'xdn'},
  {key: 'SPHTX', text: 'SophiaTX', value: 'SPHTX', picURL: 'sphtx'},
  {key: 'DEW', text: 'DEW', value: 'DEW', picURL: 'dew'},
  {key: 'VTC', text: 'Vertcoin', value: 'VTC', picURL: 'vtc'},
  {key: 'RLC', text: 'iExec RLC', value: 'RLC', picURL: 'rlc'},
  {key: 'LEND', text: 'ETHLend', value: 'LEND', picURL: 'lend'},
  {key: 'VIBE', text: 'VIBE', value: 'VIBE', picURL: 'vibe'},
  {key: 'VEE', text: 'BLOCKv', value: 'VEE', picURL: 'vee'},
  {key: 'UBQ', text: 'Ubiq', value: 'UBQ', picURL: 'ubq'},
  {key: 'BLOCK', text: 'Blocknet', value: 'BLOCK', picURL: 'block'},
  {key: 'NAV', text: 'NAV Coin', value: 'NAV', picURL: 'nav'},
  {key: 'BCO', text: 'BridgeCoin', value: 'BCO', picURL: 'bco'},
  {key: 'PPP', text: 'PayPie', value: 'PPP', picURL: 'ppp'},
  {key: 'SAN', text: 'Santiment Network Token', value: 'SAN', picURL: 'san'},
  {key: 'ENJ', text: 'Enjin Coin', value: 'ENJ', picURL: 'enj'},
  {key: 'COB', text: 'Cobinhood', value: 'COB', picURL: 'cob'},
  {key: 'RPX', text: 'Red Pulse', value: 'RPX', picURL: 'rpx'},
  {key: 'UNITY', text: 'SuperNET', value: 'UNITY', picURL: 'unity'},
  {key: 'SNGLS', text: 'SingularDTV', value: 'SNGLS', picURL: 'sngls'},
  {key: 'STORM', text: 'Storm', value: 'STORM', picURL: 'storm'},
  {key: 'ANT', text: 'Aragon', value: 'ANT', picURL: 'ant'},
  {key: 'XCP', text: 'Counterparty', value: 'XCP', picURL: 'xcp'},
  {key: 'MCO', text: 'Monaco', value: 'MCO', picURL: 'mco'},
  {key: 'DTR', text: 'Dynamic Trading Rights', value: 'DTR', picURL: 'dtr'},
  {key: 'TEL', text: 'Telcoin', value: 'TEL', picURL: 'tel'},
  {key: 'BCC', text: 'BitConnect', value: 'BCC', picURL: 'bcc'},
  {key: 'MANA', text: 'Decentraland', value: 'MANA', picURL: 'mana'},
  {key: 'TNT', text: 'Tierion', value: 'TNT', picURL: 'tnt'},
  {key: 'AST', text: 'AirSwap', value: 'AST', picURL: 'ast'},
  {key: 'HTML', text: 'HTMLCOIN', value: 'HTML', picURL: 'html'},
  {key: 'OST', text: 'Simple Token', value: 'OST', picURL: 'ost'},
  {key: 'APPC', text: 'AppCoins', value: 'APPC', picURL: 'appc'},
  {key: 'RCN', text: 'Ripio Credit Network', value: 'RCN', picURL: 'rcn'},
  {key: 'R', text: 'Revain', value: 'R', picURL: 'r'},
  {key: 'INS', text: 'INS Ecosystem', value: 'INS', picURL: 'ins'},
  {key: 'WABI', text: 'WaBi', value: 'WABI', picURL: 'wabi'},
  {key: 'AMB', text: 'Ambrosus', value: 'AMB', picURL: 'amb'},
  {key: 'BAY', text: 'BitBay', value: 'BAY', picURL: 'bay'},
  {key: 'EMC2', text: 'Einsteinium', value: 'EMC2', picURL: 'emc2'},
  {key: 'SPANK', text: 'SpankChain', value: 'SPANK', picURL: 'spank'},
  {key: 'HPB', text: 'High Performance Blockchain', value: 'HPB', picURL: 'hpb'},
  {key: 'DBC', text: 'DeepBrain Chain', value: 'DBC', picURL: 'dbc'},
  {key: 'BIX', text: 'Bibox Token', value: 'BIX', picURL: 'bix'},
  {key: 'XBY', text: 'XTRABYTES', value: 'XBY', picURL: 'xby'},
  {key: 'ACT', text: 'Achain', value: 'ACT', picURL: 'act'},
  {key: 'CTR', text: 'Centra', value: 'CTR', picURL: 'ctr'},
  {key: 'PPC', text: 'Peercoin', value: 'PPC', picURL: 'ppc'},
  {key: 'EDG', text: 'Edgeless', value: 'EDG', picURL: 'edg'},
  {key: 'SNM', text: 'SONM', value: 'SNM', picURL: 'snm'},
  {key: 'CMT', text: 'CyberMiles', value: 'CMT', picURL: 'cmt'},
  {key: 'DATA', text: 'Streamr DATAcoin', value: 'DATA', picURL: 'data'},
  {key: 'INT', text: 'Internet Node Token', value: 'INT', picURL: 'int'},
  {key: 'ZEN', text: 'ZenCash', value: 'ZEN', picURL: 'zen'},
  {key: 'ADX', text: 'AdEx', value: 'ADX', picURL: 'adx'},
  {key: 'MLN', text: 'Melon', value: 'MLN', picURL: 'mln'},
  {key: 'ITC', text: 'IoT Chain', value: 'ITC', picURL: 'itc'},
  {key: 'NULS', text: 'Nuls', value: 'NULS', picURL: 'nuls'},
  {key: 'MOD', text: 'Modum', value: 'MOD', picURL: 'mod'},
  {key: 'NLG', text: 'Gulden', value: 'NLG', picURL: 'nlg'},
];
var imageURL = './icons/CUSTOM.png';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      amountCustom1: '0',
      rateCustom1: '',
      rateCustomPrint1: '',
      valueCustom1: '0',
      apiData: 'nothing yet',
      selection1: 'ETH',
      coin1: false,
      loading: true
    };

    this.handleChangeSelection1 = this.handleChangeSelection1.bind(this);
    this.handleChangeCustomAmount1 = this.handleChangeCustomAmount1.bind(this);
    this.handleAddCoin1 = this.handleAddCoin1.bind(this);
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
    console.log('this.state.selection1 is: ' + this.state.selection1);
  }

  //handles the input field
  handleChangeCustomAmount1(event) {
    if (event.target.value == '') {
      event.target.value = 0
    }
    console.log('this.state.amountCustom1 is: ' + this.state.amountCustom1);
  }

  handleAddCoin1() {
    this.setState(prevState => ({
      //counter: this.state.counter + 1,
      coin1: true,
    }));
  }

  //calculate
  handleSubmit() {
    console.log('Button clicked');
    console.log('this.state.amountCustom1 is: ' + this.state.amountCustom1);
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
    return (
      <Container>
        <Header>
         <Body>
           <Title>Crypto Calculator</Title>
         </Body>
       </Header>
        <Content style={{ marginLeft: 10, marginRight: 10 }}>
          <Card>
            <CardItem>
              <Body>
                <Grid>
                  <Col size={50}>
                    <H3>{this.state.selection1}</H3>
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
          <Grid>
            <Col size={70}></Col>
            <Col size={15}>
              <Button light info>
                <Icon name="md-close" />
              </Button>
            </Col>
            <Col size={15}>
              <Button light info onPress={this.handleAddCoin1}>
                <Icon name="md-add" />
              </Button>
            </Col>
          </Grid>
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
