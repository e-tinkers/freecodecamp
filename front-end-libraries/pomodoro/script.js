'use strict';

function Display(props) {
  return (
    <div className="timer-wrapper" id={props.backlight}>
      <span className="timer-time-mask D7MBI">88:88</span>
      <div className="timer-info-mask">
        <span className="D7MI smaller">88</span>
        <span className="D14MI">~~~~~~~</span>
        <span className="D7MI smaller">88</span>
      </div>
        <span id="time-left" className="D7MBI timer-counter">{props.timeRemain}</span>
        <div className="timer-info-display">
          <span id="ses-leading-zero" className="D7MI info smaller">0</span>
          <span id="session-length" className="D7MI info smaller">{props.sesLen}</span>
          <span id="timer-label" className="D14MI info">{props.mode}</span>
          <span id="brk-leading-zero" className="D7MI info smaller">0</span>
          <span id="break-length" className="D7MI info smaller">{props.brkLen}</span>
        </div>
    </div>
  )
}

function DurationControl(props) {
  return (
    <div className="button-wrapper">
      <fieldset className="session-buttons">
        <legend id="session-label">Session Length</legend>
        <button type="button" id="session-decrement" onClick={props.sessionDecrement}>-</button>
        <button type="button" id="session-increment" onClick={props.sessionIncrement}>+</button>
      </fieldset>
      <fieldset className="break-buttons">
        <legend id="break-label">Break Length</legend>
        <button type="button" id="break-decrement" onClick={props.breakDecrement}>-</button>
        <button type="button" id="break-increment" onClick={props.breakIncrement}>+</button>
      </fieldset>
    </div>
  )
}

function CounterControl(props) {
  return (
    <div className="button-wrapper">
      <div className="control-buttons">
        <button type="button" id="start_stop" onClick={props.clockStart}>{props.status}</button>
        <button type="button"id="reset" onClick={props.clockReset}>Reset</button>
      </div>
    </div>
  )
}

function Footer(props) {
  return (
    <div className="text-wrapper">
      <p>- Pomodoro Clock -</p>
      <p>Designed by <a href="#" target="_blank" rel="nofollow me">H Cheung</a></p>
    </div>
  )
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timeRemain: 1500,
      mode: "Session",
      backlight: "backlight-session",
      runningId: null,
      status: "Start"
    };
  }

  clockStart() {
    if (this.state.runningId == null) {    // a new start
      const that = this;

      const callback = function() {
        if (that.state.timeRemain === 0) {   // switch from session to break or vice versa
          that.switchMode();
          document.getElementById('beep').play();
        }
        else {
          that.setState({
            timeRemain: that.state.timeRemain - 1,
            status: "Start"
          });
        }
      };

      const ticker = setInterval(callback, 1000);
      that.setState({
        runningId: ticker
      });
    }
    else {      // pause
      clearInterval(this.state.runningId);
      this.setState({
        runningId: null,
        status: "Paused"
      });
    }
  }

  switchMode() {
    if(this.state.mode === 'Session') {
      this.setState({
        timeRemain: this.state.breakLength * 60,
        mode: '-Break-',
        backlight: 'backlight-break'
      });
    }
    else {
      this.setState({
        timeRemain: this.state.sessionLength * 60,
        mode: 'Session',
        backlight: 'backlight-session'
      });
    }
  }

  clockReset() {
    clearInterval(this.state.runningId);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timeRemain: 1500,
      mode: 'Session',
      backlight: 'backlight-session',
      runningId: null,
      status: "Start"
    });
  }

  sessionIncrement() {
    const newValue = this.state.sessionLength+1;
    if (newValue > 60) return;
    this.setState({
      sessionLength: newValue,
      timeRemain: newValue * 60
    });
  }

  sessionDecrement() {
    const newValue = this.state.sessionLength - 1;
    if (newValue < 1) return;
    this.setState({
      sessionLength: newValue,
      timeRemain: newValue * 60
    });
  }

  breakIncrement() {
    const newBrk = this.state.breakLength + 1;
    if (newBrk > 60) return;
    this.setState({
      breakLength: newBrk
    });
  }

  breakDecrement() {
    const newBrk = this.state.breakLength - 1;
    if (newBrk < 1) return;
    this.setState({
      breakLength: newBrk
    });
  }

  // Freecodecamp testing algo reading the data from #session-length and #break-length,
  // and will failed the test if there is a leading zero, it however break my display
  // formating. this is a hack to add a '0' prior $session-length and #break-Length
  // so it will pass the test, yet make the display formating as wish.
  padZero(mins, typeId) {
    htmlTag = document.getElementById(typeId);
    (mins > 10) ? htmlTag.textContent="" :htmlTag.textContent="0";
    return mins;
  }

  clockStr(seconds) {
    const mins = Math.floor(seconds/60).toString().padStart(2,'0');
    const secs = (seconds % 60).toString().padStart(2,'0');
    return mins + ":" + secs;
  }

  render() {
    return (
      <div>
        <audio id="beep" type="audio/mp3" ref={(audio) => { this.audioPlay = audio; }} src="good-morning.mp3" preload="auto"></audio>
        <Display
          mode = {this.state.mode}
          sesLen = {this.padZero(this.state.sessionLength, "ses-leading-zero")}
          brkLen = {this.padZero(this.state.breakLength, "brk-leading-zero")}
          timeRemain = {this.clockStr(this.state.timeRemain)}
          backlight = {this.state.backlight}
        />
        <DurationControl
          sessionIncrement = {this.sessionIncrement.bind(this)}
          sessionDecrement = {this.sessionDecrement.bind(this)}
          breakIncrement = {this.breakIncrement.bind(this)}
          breakDecrement = {this.breakDecrement.bind(this)}
        />
        <CounterControl
          clockStart = {this.clockStart.bind(this)}
          clockReset = {this.clockReset.bind(this)}
          status = {this.state.status}
        />
        <Footer />
      </div>
    );
  }
}


ReactDOM.render(
  <Pomodoro />,
  document.getElementById('app')
);
