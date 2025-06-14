import {
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(
    new Array(9).fill(null).map(() => ({
      type: 'empty',
      animation: new Animated.Value(1),
    })),
  );

  const reloadGame = () => {
    setGameState(
      new Array(9).fill(null).map(() => ({
        type: 'empty',
        animation: new Animated.Value(1),
      })),
    );
    setIsCross(false);
    setGameWinner('');
  };

  const checkIsWinner = (): boolean => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (
        gameState[a].type !== 'empty' &&
        gameState[a].type === gameState[b].type &&
        gameState[a].type === gameState[c].type
      ) {
        const winner = gameState[a].type;

        const updatedGameState = [...gameState];
        updatedGameState[a].type = 'win';
        updatedGameState[b].type = 'win';
        updatedGameState[c].type = 'win';

        setGameState(updatedGameState);
        setGameWinner(`${winner} is a winner 🥳`);

        // Bounce animation for each winning cell
        [a, b, c].forEach(index => {
          Animated.sequence([
            Animated.timing(updatedGameState[index].animation, {
              toValue: 1.5,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(updatedGameState[index].animation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        });

        Snackbar.show({
          text: `${winner} is a winner 🥳`,
          backgroundColor: 'green',
          textColor: 'black',
        });

        return true;
      }
    }

    // If all cells are filled and no winner
    const isDraw = gameState.every(cell => cell.type !== 'empty');
    if (isDraw) {
      setGameWinner("No one is winner, it's a draw! 😅");
      Snackbar.show({
        text: "No one is winner, it's a draw! 😅",
        backgroundColor: 'orange',
        textColor: 'black',
      });
      return true;
    }

    return false;
  };
  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) reloadGame();
    if (gameState[itemNumber].type === 'empty') {
      const newGameState = [...gameState];
      newGameState[itemNumber].type = isCross ? 'cross' : 'circle';
      setGameState(newGameState);
      setIsCross(!isCross);
      checkIsWinner();
    } else {
      return Snackbar.show({
        text: 'Position already marked! Try again',
        backgroundColor: 'red',
        textColor: '#000000',
      });
    }
  };
  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item.type} animation={item.animation} />
          </Pressable>
        )}
      />

      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Play Again' : 'New Game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    marginTop: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
