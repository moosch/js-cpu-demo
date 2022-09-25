# Rowing Faster with JavaScript

This repo is an exploration into writing JavaScript with the hardware in mind.

Usually as JS devs, we don't care so much about the platform (hardware) our code runs on, nor do we concern ourselves that often with the memory we allocate, because we don't directly perform the allocation, it's handled for us. But what if we did? Would we be able to see some improvements? Or should we just stick with trying our darndest to write more understandable code?

## Loops

We create and loop though a matrix. Pretty standard...in games anyway, but it represents some slightly heavy data computation.

In the first example we are simply summing all the items in the matrix, and measuing the time it takes to do so.

In the second example we are building an array of the total odd numbers found in each row or column (depending on row or column major iteration).

Both cases show row vs column major traversal, which simply means looping through rows first or columns.

One thing to keep in mind is that row-major and column-major traversal are theoretically both the same O-notation. O(n^2).

We may also get to a third example which looks at using worker threads to take advantage of multicore programming.

### Loop variants

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
node sum_loop/main.js row
node sum_loop/main.js col
```

Next we will try out a _slightly_ altered version of the code that prefers
more locally scoped counters, and thus creates extra assignment.


```shell
node row_odds/main.js row
ndoe row_odds/main.js col
```

## Variable assignment

Intuition tells us the additional assignments of variables equals a slower program, right? Well, not always.

Continuing on from our matrix computation, we're going to add some additional variables that will help us avoid ghost reads.

Running the optimised versions of the scripts above show improvements in the
execution time.

```shell
node sum_loop/main_optimised.js row
node sum_loop/main_optimised.js col
```

```shell
node row_odds/main_optimised.js row
node row_odds/main_optimised.js col
```

## Todo

- [ ] Add some diagrams of CPU caches and memory layout
- [ ] Flesh out the multicore/thread code a bit with explinations

