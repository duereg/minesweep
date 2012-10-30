*Minesweeper* is a *grid* of *tiles*, each of which may or may not cover hidden *mines*. 

The goal is to **click** on every *tile* except those that have *mines*. 

When a *user* **clicks** a *tile*, one of two things happens. 

+ If the *tile* was covering a *mine*, the *mine* is revealed and the *game* ends in *failure*.	
+ If the *tile* was not covering a *mine*, it instead reveals the number of adjacent (including diagonals) *tiles* that are covering *mines* – and, if that number was 0, behaves as if the *user* has **clicked** on every *tile* around it. 

When the *user* is confident that all *tiles* not containing *mines* have been **clicked**, the *user* **clicks** a *Validate* button (often portrayed as a smiley-face icon) that **checks** the **clicked** *tiles*: 

+ if the *user* is correct, the *game* ends in *victory*
+ if not, the *game* ends in *failure*.

TODO: feedback when "new game is pressed" and size of board hasn't changed.
TODO: Cheat mode