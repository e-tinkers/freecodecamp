class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Let's Play!"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleClick(e) {
    this.playAudio(e.target.value);
    this.setState({
      display: e.target.id
    });
  }
  handleKeyPress(e) {
    const validKeys = 'QWEASDZXC';
    const k = e.key.toUpperCase();
    if (validKeys.indexOf(k) !== -1) {
      this.playAudio(k);
      this.setState({
        display: document.getElementById(k).parentNode.id
      });
    }
  }
  playAudio(audioTarget) {
    const audio = document.getElementById(audioTarget);
    audio.currentTime = 0;
    audio.play();
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  render() {
      const drums = [
        {id: "Heater-1", value: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
        {id: "Dsc_Oh", value: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
        {id: "Brk_Snr", value: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"},
        {id: "Heater-2", value: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
        {id: "punchy_kick_1", value: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"},
        {id: "Heater-4_1", value: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
        {id: "side_stick_1", value: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"},
        {id: "Bld_H1", value: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"},
        {id: "Heater-3", value: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}
      ];
      const drumSet = drums.map(drum => {
        return (
          <button
            type="button"
            className="drum-pad"
            value={drum.value}
            key={drum.id}
            id={drum.id}
            onClick = {this.handleClick}
          >{drum.value}
            <audio src={drum.src} className="clip" id={drum.value}></audio>
          </button>
        )
      });
      return (
        <div>
          <div className="row display">
            <p id="display">{this.state.display}</p>
          </div>
          <div className="row drum-set">
            {drumSet}
          </div>
        </div>
      );
    }
}

ReactDOM.render(
  <DrumMachine />,
  document.getElementById('drum-machine')
);
