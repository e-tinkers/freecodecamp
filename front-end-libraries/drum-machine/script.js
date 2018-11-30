function Display(props) {
  const powerStyle = props.display === "" ? "powerOff" : "powerOn";
  return (
    <div className="row">
      <p id="display" className={powerStyle}>{props.display}</p>
    </div>
  )
}


function ControlPanel(props) {
  return (
    <div className="row control">
      <div className="switch">
        <p>Power</p>
        <label>
          <input type="checkbox" id="power" checked={props.powerOn} onChange={props.handlePower} />
          <span className="toggler"></span>
        </label>
      </div>
      <div className="range-slider">
        <p>Volume</p>
        <span className="range-indicator">0</span>
        <input type="range" id="volume" min="1" max="100" defaultValue="50" disabled={!props.powerOn} />
        <span className="range-indicator">100</span>
      </div>
      <div className="switch">
        <p>Bank</p>
        <label>
          <input type="checkbox" id="mode" disabled={!props.powerOn} checked={props.mode} onChange={props.chooseMode} />
          <span className="toggler"></span>
        </label>
      </div>
    </div>
  )
}


function DrumSet(props) {
  const bank1 = [
    {id: "Heater-1", value: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {id: "Dsc_Oh", value: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {id: "Brk_Snr", value: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"},
    {id: "Heater-2", value: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {id: "Heater-6", value: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {id: "Heater-4_1", value: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {id: "side_stick_1", value: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"},
    {id: "Bld_H1", value: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"},
    {id: "Heater-3", value: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}
  ];
  const bank2 = [
    {id: "Chord_1", value: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"},
    {id: "RP4_KICK_1", value: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {id: "Dry_Ohh", value: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"},
    {id: "Chord_2", value: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"},
    {id: "Kick_n_Hat", value: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {id: "Give_us_a_light", value: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"},
    {id: "punchy_kick_1", value: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"},
    {id: "Cev_H2", value: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"},
    {id: "Chord_3", value: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"}
  ];
  const drums = (props.mode === "Heater Kit") ? bank1 : bank2;
  const drumSet = drums.map(drum => {
    return (
      <button
        type="button"
        className="drum-pad"
        value={drum.value}
        key={drum.id}
        id={drum.id}
        onClick = {props.handleClick}
      >{drum.value}
        <audio src={drum.src} className="clip" id={drum.value}></audio>
      </button>
    )
  });
  return drumSet;
}


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      powerOn: false,
      volume: 50,
      mode: "Heater Kit"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.chooseMode = this.chooseMode.bind(this);
  }

  handleClick(e) {
    if (this.state.powerOn) {
      this.playAudio(e.target.value);
      this.setState({
        display: e.target.id
      });
    }
  }

  handleKeyPress(e) {
    if (this.state.powerOn) {
      const validKeys = 'QWEASDZXC';
      const k = e.key.toUpperCase();
      if (validKeys.indexOf(k) !== -1) {
        this.playAudio(k);
        this.setState({
          display: document.getElementById(k).parentNode.id
        });
      }
    }
  }

  drumAnimated() {

  }

  handlePower(e) {
    const status = e.target.checked;
    this.setState({
      powerOn: status,
      display: status ? "On" : ""
    });
    document.getElementById('volume').disabled=!status;
    document.getElementById('mode').disabled=!status;
  }

  handleVolume(e) {
    this.setState({
      volume: e.target.value,
      display: `Volume: ${e.target.value}`
    });
  }

  chooseMode(e) {
    const mode = (e.target.checked) ? "Smooth Piano Kit" : "Heater Kit";
    this.setState({
      display: mode,
      mode: mode
    });
  }

  playAudio(audioTarget) {
    const audio = document.getElementById(audioTarget);
    audio.volume = this.state.volume/100;
    audio.currentTime = 0;
    audio.play();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.getElementById('volume').addEventListener('change', this.handleVolume);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.getElementById('volume').removeEventListener('change', this.handleVolume);
  }

  render() {
    return (
      <div>
        <Display display={this.state.display} />
        <ControlPanel handlePower={this.handlePower} chooseMode={this.chooseMode}/>
        <div className="row drum-set">
          <DrumSet mode={this.state.mode} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <DrumMachine />,
  document.getElementById('drum-machine')
);
