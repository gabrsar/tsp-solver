# SFR3 - Part 2 (Coding Exercise)

# Requirements

    Part #2 (coding exercise)
    
    The objective is to minimize the total travel distance while ensuring that all delivery points are visited. Implement a solution that finds the shortest possible route that visits each delivery point exactly once and returns to the starting point (i.e., solve the Travelling Salesman Problem).
    
    Requirements:
    Input: A list of delivery points, each represented by a pair of coordinates (x, y).
    Output: The shortest possible route (as a list of delivery points) and the total travel distance.
    
    Instructions:
    Read the list of delivery points from a text file named delivery_points.txt. Each line in the file contains a pair of coordinates, separated by a comma
    Implement the solution. You may use any standard libraries or frameworks, but you must write the core algorithm yourself. 
    Ideally in Python, but we allow other languages if you are proficient in other languages.
    Document your code. Provide clear and concise comments explaining your approach and any assumptions made.
    Optimize for performance. Consider the efficiency of your solution, especially for larger sets of delivery points.
    Include unit tests. Write unit tests to validate the correctness of your solution.
    
    Submission:
    Source Code: Submit your source code files.
    Unit Tests: Submit the unit test files.
    ReadMe: Include a ReadMe file explaining your approach, how to run the code, and any other relevant information. Additional info to include: (1) describe how you would deploy changes to this file, (2) monitoring plan: what kind of monitoring would you set up (hypothetically) to ensure this working as expected.

# Running

## Running tests:

`npm run tests`

## Running TSP solver:

Run `npm install` to install dependencies
As required, change the file `delivery_points.txt` with your points and then run: `npm start`.
Please, ensure if the file nas no empty line at the end.

# Approach

The Travelling Salesman Problem (TSP) is well known and notoriously hard to solve properly (as requested it is NP-Hard).

Since brute-force has a processing complexity of O(n!) (and memory can get just as bad if you're not careful), my first priority was getting the project structure right. If the structure is solid, in the worst-case scenario we could just plug in a state-of-the-art solver and move on.

I went deep into the TSP topic via Wikipedia — looking into solvers, strategies, and theory. Basically, there are two options:

    Exact solvers: give the optimal solution, but don’t scale past ~30–40 points.
    Best-effort solvers: give a suboptimal solution, but can handle much larger sets.

I started by implementing a trivial solution just to get the structure working, ran some tests, and had a bit of fun watching my machine struggle with 15 points.

Once everything was working and structured properly, I looked for a strategy I could realistically implement in the time I had.

What I found is that combining two simple strategies often yields better results than trying to implement something complex that wouldn’t be ready in time.

So I went with a mix of Nearest Neighbours (known for poor results but decent speed) followed by a second pass using the 2-opt algorithm.

*Although I was not able to finish the 2-opt implementation by myself in time, I used chat-gpt to generate it and used it just to have a better result.*
*Both NN and BruteForce implementation were made by myself*

Since I wanted to be able to test different strategies, I built a generic system that supports multiple TSP Solvers, and the surrounding structure takes care of integrating them. That way it’s super easy to add new solvers later on.

Stack:

    TypeScript + Node.js — it’s what I’m most comfortable with, so I can tweak anything in real-time if needed.

# Improvements & Next Step

1. Refactor re-write 2-otp by hand :)
2. Dockerfile for simpler execution and environment independence.
3. Use some logger lib instead of console.log.
4. Algorithms optimization with a profiler, searching for hotspots.
5. Review grammar mistakes.
6. File reading tests.
7. Lint (Prettier) on commit.

## Minor things I made that can pass unnoticed.
1. Locked version of packages. It's very important to know when things change. I had many issues with dependencies of my packages changing and even patches giving a lot of trouble.
2. Prettier :) No more unnecessary big diffs because each developer uses a coding different code-style 
3. Factorial tests and safe limits. Is not much, but it was honest work.
4. 