# Corgo App
Onboarding Tool for New Smartphone Users

## To Begin Development
1. Clone repository.
2. Ensure you have installed the latest version of the following:
    * Node.js
    * Java Jdk (used for emulation)
3. In a terminal at the root directory run `npm install`.
    * This will install all dependencies for all packages in th project. Including dev dependencies.
4. In the same terminal, do `cd firebase`.
5. Do `npx firebase login`, then sign in with a google account associated with a Firebase project.
6. Setup environmental variable files.
    * Ues the files in the `.setup` folder as templates and fill in the missing values.
    * Be sure to remove the "template" part of the file name if you just copy them into their respective directories.

## Running the project in `dev` mode
1. In a terminal at the root directory run `npm run start-emulators`.
2. In a second terminal at the root directory, do `npm run start-all-dev`.


