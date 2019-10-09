import { connect } from "react-redux";
import React from "react";
import Board from "../components/Board";
import { handleClick, clickList, resetGame, reverseArray } from "../actions";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      caro,
      handleClick1,
      clickList1,
      resetGame1,
      reverseArray1
    } = this.props;
    return (
      <div>
        <Board
          size={20}
          caro={caro}
          handleClick={handleClick1}
          clickList={clickList1}
          resetGame={resetGame1}
          reverseArray={reverseArray1}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  caro: state.caro
});

const mapDispatchToProps = dispatch => {
  return {
    handleClick1: i => {
      dispatch(handleClick(i));
    },
    clickList1: i => {
      dispatch(clickList(i));
    },
    resetGame1: i => {
      dispatch(resetGame(i));
    },
    reverseArray1: i => {
      dispatch(reverseArray(i));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
