'use strict';
const quotes = [
  {
    "quote": "Ride as much or as little, as long or as short as you feel. But ride.",
    "author": "Eddy Merckx"
  },
  {
    "quote": "The race is won by the rider who can suffer the most.",
    "author": "Eddy Merckx"
  },
  {
    "quote": "Don't buy upgrades, ride up grades.",
    "author": "Eddy Merckx"
  },
  {
    "quote": "When my legs hurt, I say: Shut up legs! Do what I tell you to do!.",
    "author": "Jens Voigt"
  },
  {
    "quote": "If you go (with a break), you can either win or not win. If you don't go for it, you definitely won't win.",
    "author": "Jens Voigt"
  },
  {
    "quote": "It never gets easier, you just get faster.",
    "author": "Greg LeMond"
  },
  {
    "quote": "I have always struggled to achieve excellence. One thing that cycling has taught me is that if you can achieve something without a struggle it's not going to be satisfying.",
    "author": "Greg LeMond"
  },
  {
    "quote": "Nothing compares to the simple pleasure of riding a bike.",
    "author": "John F. Kennedy"
  },
  {
    "quote": "Give a man a fish and feed him for a day. Teach a man to fish and feed him for a lifetime. Teach a man to cycle and he will realize fishing is stupid and boring.",
    "author": "Desmond Tutu"
  },
  {
    "quote": "It doesn't matter if you're sprinting for an Olympic gold medal, a town sign, a trailhead, or the rest stop with the homemade brownies. If you never confront pain, you're missing the essence of the sport.",
    "author": "Scott Martin"
  },
  {
    "quote": "The best rides are the ones where you bite off much more than you can chew, and live through it.",
    "author": "Doug Bradbury"
  },
  {
    "quote": "To me, it doesn't matter whether it's raining or the sun is shining or whatever: as long as I'm riding a bike I know I'm the luckiest guy in the world.",
    "author": "Mark Cavendish"
  },
  {
    "quote": "When the spirits are low, when the day appears dark, when work becomes monotonous, when hope hardly seems worth having, just mount a bicycle and go out for a spin down the road, without thought on anything but the ride you are taking.",
    "author": "Arthur Conan Doyle"
  },
  {
    "quote": "It is the unknown around the corner that turns my wheels.",
    "author": "Heinz Stucke"
  },
  {
    "quote": "The bicycle is a curious vehicle. Its passenger is its engine..",
    "author": "John Howard"
  },
  {
    "quote": "Crashing is part of cycling as crying is part of love..",
    "author": "Johan Museeuw"
  },
  {
    "quote": "As long as I breathe, I attack..",
    "author": "Bernard Hinault"
  },
  {
    "quote": "Learn to ride a bicycle. You will not regret it if you live..",
    "author": "Mark Twain"
  },
  {
    "quote": "Life is like a 10-speed bicycle. Most of us have gears we never use..",
    "author": "Charles M. Schultz"
  },
  {
    "quote": "Whenever I see an adult on a bicycle, I do not despair for the human race..",
    "author": "H.G. Wells"
  },
  {
    "quote": "Melancholy is incompatible with bicycling..",
    "author": "James E. Starrs"
  },
  {
    "quote": "The bicycle is the noblest invention of mankind..",
    "author": "William Saroyan"
  },
  {
    "quote": "Life is like riding a bicycle. In order to keep your balance, you must keep moving..",
    "author": "Albert Einstein"
  },
  {
    "quote": "I thought of that while riding my bicycle..",
    "author": "Albert Einstein, in reference to the Theory of Relativity."
  },
  {
    "quote": "Think of bicycles as ridable art that can just about save the world..",
    "author": "Grant Petersen"
  },
  {
    "quote": "A bicycle is the finest mode of transport known to man..",
    "author": "Adam Hart-Davis"
  },
  {
    "quote": "Bicycling is a big part of the future. It has to be. There's something wrong with a society that drives a car to workout in a gym..",
    "author": "Bill Nye"
  },
  {
    "quote": "When you ride a bike and you get your heart rate up and you're out, after 30 or 40 minutes your mind tends to expand; it tends to relax..",
    "author": "[former] US President George W. Bush"
  },
  {
    "quote": "Whoever invented the bicycle deserves the thanks of humanity.",
    "author": "Lord Charles Beresford"
  },
  {
    "quote": "Every time you miss your childhood, ride on a bicycle!.",
    "author": "Mehmet Murat ildan"
  },
  {
    "quote": "Bicycle means simplicity and simplicity means happiness.",
    "author": "Mehmet Murat ildan"
  },
  {
    "quote": "Nature loves bicycle because no harm to nature comes from the bicycle!.",
    "author": "Mehmet Murat ildan"
  },
  {
    "quote": "My biggest fear is not crashing on a bike.. It's sitting in a chair at 90 and saying, 'I wish I had done more..",
    "author": "Graeme Obree"
  },
  {
    "quote": "Truly, the bicycle is the most influential piece of product design ever..",
    "author": "Hugh Pearman"
  },
  {
    "quote": "Riding bicycles will not only benefit the individual doing it, but the world at large..",
    "author": "Udo E. Simonis"
  },
  {
    "quote": "Cycling has encountered more enemies than any other form of exercise..",
    "author": "19th-century author Louis Baudry de Saunier"
  },
  {
    "quote": "I have the impression that cycling is no longer a game but rather an employment.. a job.",
    "author": "Bernard Hinault"
  },
  {
    "quote": "There's a certain amount of freedom involved in cycling: you're self-propelled and decide exactly where to go. If you see something that catches your eye to the left, you can veer off there, which isn't so easy in a car, and you can't cover as much ground walking.",
    "author": "David Byrne"
  },
  {
    "quote": "Cycling is good for people in all ways: their health, their well-being, and it does no damage to the environment.",
    "author": "Jeremy Corbyn"
  },
  {
    "quote": "I'm in control, liberated and free, when I'm on my bike..",
    "author": "Erin O'Connor"
  },
  {
    "quote": "When your legs scream stop and your lungs are bursting, that's when it starts. That's the hurt locker. Winners love it there..",
    "author": "Chris McCormack"
  },
  {
    "quote": "Life is like a ten speed bicycle. Most of us have gears we never use..",
    "author": "Charles M. Schulz"
  },
  {
    "quote": "Cyclers see considerable more of this beautiful world than any other class of citizens. A good bicycle, well applied, will cure most ills this flesh is heir to..",
    "author": "Dr. K. K. Doty"
  },
  {
    "quote": "The bicycle is a curious vehicle. Its passenger is its engine..",
    "author": "John Howard"
  },
  {
    "quote": "A bicycle ride is a flight from sadness..",
    "author": "James E. Starrs"
  },
  {
    "quote": "Death may have no master, but the bicycle is, most emphatically, not its slave..",
    "author": "James E Starts"
  },
  {
    "quote": "Cycle tracks will abound in Utopia..",
    "author": "H.G. Wells"
  },
  {
    "quote": "When you're turning the crankset, you're riding the bike. When you're coasting, you're just along for the ride..",
    "author": "Ned Overend"
  },
  {
    "quote": "A raggedy ride beats a dressed up walk..",
    "author": "Simon Peat"
  },
  {
    "quote": "Life may not be about your bike, but it sure can help you get through it..",
    "author": "Hallman"
  }
];
class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    const len = props.quotes.length;
    let index = Math.floor(Math.random()*props.quotes.length);
    this.state = {
      len: len,
      index: index,
      quote: props.quotes[index].quote,
      author: props.quotes[index].author
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.state.index = (this.state.index + 1) % this.state.len;
    this.setState({
      index: this.state.index,
      quote: this.props.quotes[this.state.index].quote,
      author: this.props.quotes[this.state.index].author
    });
  }
  getQuote() {
    return {quote: this.state.quote, author: this.state.author};
  }
  render() {
    return (
      <div>
        <p className="lead" id="text"
          dangerouslySetInnerHTML = {{__html:this.getQuote().quote}}
        ></p>
        <p className="lead" id="author"
          dangerouslySetInnerHTML = {{__html:this.getQuote().author}}
        ></p>
        <p className="lead">
          <a href="#" className="btn btn-md btn-secondary" id="new-quote"
          onClick = {this.handleClick}
          >New Quote</a>
          <a href="https://twitter.com/intent/tweet" className="btn btn-md btn-secondary" id="tweet-quote">Tweet Quote</a>
        </p>
        <p className="credit">Random Quote Machine, by <a href="https://github.com/e-tinkers/" rel="nofollow me">H Cheung</a>.</p>
      </div>
    )
  }
};

ReactDOM.render(
  <QuoteBox quotes={quotes} />,
  document.getElementById('quote-box')
);
