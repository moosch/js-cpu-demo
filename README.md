# Faster rowing in JavaScript

Intuition tells us the additional assignments of unnecessary variables equals a
slower program, right? Well, not always.

We're looping through a matrix. Pretty standard...in games anyway.

In the first example we are simply summing all the items in the matrix, and measuing the time it takes to do so.

In the second example we are building an array of the total odd numbers found in
each row or column (depending on row or column major iteration).

Both cases show row vs column major traversal, which simply means looping
through rows first or columns first. i.e. `matrix[a][b]` where `a` is the row
for row number major, or the column number for column major.

One thing to keep in mind is that row-major and column-major traversal are theoretically both the same O-notation. O(n^2).

There is also a thrist example set which looks at using worker threads, but
that's out of scope for now.

## Memory layout primer

We accept a single CLI param of either `row` or `col` to specify if we want the
algorithm to use row or column major traversal.

```
// pseudocode
let sum = 0
for row in matrix
  for col in matrix
    sum += matrix[row][col]

// or

for col in matrix
  for row in matrix
    sum += matrix[row][col]
```

This highlights the first interesting point about how memory is layed out in L1,
L2, L3 caches.

```shell
node sum_loop.js row
node sum_loop.js col

node sum/loop_optimised.js row
node sum/loop_optimised.js col
```


## Memory access

Next we will try out a _slightly_ altered version of the code that prefers
more locally scoped counters, and thus creates extra assignment.


``shell
node row_odds/odds.js row
ndoe row_odds/odds.js col

node row_odds/odds_optimised.js row
node row_odds/odds_optimised.js col
```
