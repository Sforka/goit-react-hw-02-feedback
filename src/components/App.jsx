import { Component } from 'react';
import { Section } from './Section';
import { FeedbackOptions } from './feedback/FeedbackOptions.jsx';
import { Statistics } from './feedback/Statistics';
import { Notification } from './Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  

  countTotalFeedback = () => {
    const total = this.state.good + this.state.neutral + this.state.bad;
    return total;
  };
  countPositiveFeedbackPercentage = () => {
    
      const percentage =
        Math.trunc((this.state.good * 100) /
        (this.state.good + this.state.neutral + this.state.bad));
      
      return percentage;
    
  };

  handleClick = e => {
    this.setState(prev => {
      return {
        [e.target.className]: (prev[e.target.className] += 1),
      };
    });
  };

  render() {
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleClick}
          />
        </Section>
        {this.countTotalFeedback() > 0 ? (<Section title="Statistics">
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        </Section>) :
          (<Notification message="There is no feedback"></Notification>)
        }
      </div>
    );
  }
}
