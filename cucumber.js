module.exports = {
    specs: [
        './features/**/*.feature'
    ],


    stepDefinitions: [
        './features/stepDefinitions/**/*.js'
    ],


    plugins: [{

        path: 'node_modules/cucumber-pretty',
        options: {
            // Options spécifiques au plugin, si nécessaire
        }
    }],

    // Spécifie d'autres options de configuration, si nécessaire
    // Par exemple, les options de lancement du navigateur pour les tests BDD utilisant Puppeteer
    // ou d'autres options spécifiques à votre projet.
};