# Changes Viewer

A simple proof of concept using React, Vite, and Radix/Tailwind CSS to visualise JSON Data file changes. 

The idea is to not only just show 'what's changed' between snapshots, but 'where it's changed' in the context of the dataset. 


# How it works
1. takes a 'changes.json' file upload
2. builds a table from the file's 'data' list
3. adds green highlighting to list items matching 'differences' of type 'added'
4. appends differences of type 'removed' to the bottom of the table with red highlighting


You can use the mock JSON data files in 'testdata' to simulate a sequence of snapshots taken over time to see how the data moves.
