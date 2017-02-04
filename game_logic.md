# START GAME

  # FOR EACH ROUND TYPE [OF 3]
    # CREATE NEW ROUND
    # PUT ALL CARDS IN THE BOWL

    # WHILE THERE ARE CARDS IN THE BOWL
      # CREATE NEW TURN
        # CHOOSE CLUEGIVER [FROM *OPPOSING* TEAM OF PREVIOUS TURN IF EXISTS]
        # SHOW 5-SECOND COUNTDOWN
        # SHOW NAME AND TEAM OF NEXT CLUEGIVER

          # WHILE TURN IS NOT OVER (SECONDS REMAINING > 0)
            # SEND RANDOM CARD FROM BOWL
              # IF CARD IS WON
                # REMOVE CARD FROM THE BOWL
                  # BREAK IF NO MORE CARDS IN BOWL
                # ADD 1 TO TEAM SCORE
              <!-- # ELSE IF CARD IS PASSED
                # BREAK IF ONE CARD REMAINING
                # RETURN CARD TO FISHBOWL
                # SEND A NEW CARD
                # REDUCE TIME BY XX SECS ??? -->
          # END WHILE

    # END WHILE (CARDS LEFT IN BOWL == 0)

    # SAVE SCORES
    # IF TIMER IS NOT EMPTY && ALL ROUNDS NOT FINISHED
      # SAVE THE AMOUNT OF TIME LEFT
      # SAVE THE TURN'S PLAYER

  # END FOR

GAME:
  #current_round
  #initialize [with 3 rounds]
  #get_cluegiver
    - starts with player 0 of team 1
    - iterates through players, alternating team 1 to team 2
    <!-- - the next cluegiver is from the team opposing the last
    - gets CG of opposing team to last TURN
      - gets player with fewest turns for the game -->


ROUND:
  #is_over?
  #last_turn

<!-- ROUND_TYPE:
  # constants: NAME and DESCRIPTION
    # create these -->

TURN:
  #is_over?

