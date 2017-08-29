import React, { Component } from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as gameStateActionCreators from '../actions/gameStateActions';
import * as playerStateActionCreators from '../actions/playerStateActions';
import * as gameAndPlayerStateActionCreators from '../actions/gameAndPlayerStateActions';
import RaisedButton from 'material-ui/RaisedButton';
import GradualLinearProgressBar from './GradualLinearProgressBar'

import { merge } from 'lodash';

import HandSignContainer from './HandsignContainer';
import ChosenHandSignVisual from './ChosenHandSignVisual';
import ScoreBoardVisual from './ScoreBoardVisual';

class Play extends Component {
	render() {
		const gameState = this.props.gameState;
		const playerState = this.props.playerState;
		let stuffToRender;

		if(gameState.state === 'IN_GAME_CHOOSING') {
			stuffToRender = (
				<div>
					{/*https://codepen.io/carsy/pen/VvqJwm*/}
					{/*https://kimmobrunfeldt.github.io/progressbar.js/*/}
					<p> Choose before time runs out! </p>
					{}
					<GradualLinearProgressBar />
				</div>
			);
		}
		else if(gameState.state === 'ROUND_OVER') {
			stuffToRender = (<div>
				ROUND OVER
				<br/>
				You {gameState.matchResult.toUpperCase()} !!!
			</div>);
		}
		else if(gameState.state === 'GAME_OVER') {
			stuffToRender = (
				<div>
					<p>GAME OVER</p>
					<p>You {gameState.matchResult.toUpperCase()} !!!</p>
					<RaisedButton
						label='exit'
						onClick={() => this.props.exitMatch()}
					/>
				</div>
			);
		}
		else if(gameState.state === 'OPPONENT_FORFEIT') {
			stuffToRender = (
				<div>
					<p>Opponent Has Forfeited</p>
					<p>You Win !!!</p>
					<RaisedButton
						label='exit'
						onClick={() => this.props.exitMatch()}
					/>
				</div>
			);
		}

		return (
			<div>
				

				<ScoreBoardVisual score={playerState.opponent.score} maxScore={gameState.maxScore} />
				<ChosenHandSignVisual handSign={playerState.opponent.handSign} />

				<div>
					{stuffToRender}
				</div>

				<ChosenHandSignVisual handSign={playerState.own.handSign} />

				<HandSignContainer />
				<ScoreBoardVisual score={playerState.own.score} maxScore={gameState.maxScore} />

			</div>
		);


	}
}

function mapStateToProps(state){
	return {
		gameState: state.gameState,
		playerState: state.playerState
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(
		merge(
			gameStateActionCreators,
			playerStateActionCreators,
			gameAndPlayerStateActionCreators
		),
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(Play);
