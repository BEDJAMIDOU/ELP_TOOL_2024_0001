const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const programme_principal_sphere_fictive = require('./programme_principal_sphere_fictive');
const programme_principal_sphere_fictive_pda = require('./programme_principal_sphere_fictive_pda');
const programme_principal_modele_electrogeometrique_ludique = require('./programme_principal_modele_electrogeometrique_ludique');


const port = 3000;

/////////////////////////////////////////////SECURISATION LOGICIEL

//const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');
app.use(cors());

//const app = express();
app.use(bodyParser.json());

//app.post('*', authenticateToken);

const SECRET_KEY = "votre_secret"; // Clé secrète pour signer les tokens
//const USERS = [{id: '0002', username:'bernardavid',fullname:'BERNARD DAVID',email:'BERNARD.DAVID@engie.com',organisation:'INEO',phone: '0633156565',subscriptionStartDate: "2024-12-15T17:20:00", password: "0000"},
  //  {id: '0001', username:'abderrahimbedja',fullname:'BEDJA ABDERRAHIM',email:'abderrahim.bedja@equans.com',organization:'INEO',phone: '0633156518',subscriptionStartDate: "2024-12-15T17:20:00", password: "0000"}]; // Remplacez par une base de données dans un environnement réel
//const USERS1 = [];

// Route pour créer un utilisateur



const redis = require('redis');
const redisClient = redis.createClient();



const { promisify } = require('util');

// Promisifier les méthodes
//const getAsync = promisify(redisClient.get).bind(redisClient);


redisClient
    .on('error', (err) => console.error('Erreur Redis :', err))
    .on('connect', () => console.log('Connecté à Redis'))
    .on('ready', () => console.log('Redis est prêt'))
    .on('end', () => console.log('Connexion Redis fermée'));

async function ensureRedisConnected() {
    if (!redisClient.isOpen) {
        try {
            console.log('Reconnexion à Redis...');
            await redisClient.connect();
        } catch (err) {
            console.error('Erreur lors de la reconnexion à Redis :', err);
        }
    }
}


setInterval(() => {
    const used = process.memoryUsage();
    console.log(`Memory usage: 
    RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, 
    Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB, 
    Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 5000);




//ensureRedisConnected();

//await ensureRedisConnected();
async function deleteSession(userId) {
    try {
        await ensureRedisConnected();

        console.log('UserId dans logout function',userId)

        // Supprimer la session associée à userId
        const result = await redisClient.del(userId); // `del` est la commande pour supprimer une clé
        console.log(`Session pour userId ${userId} supprimée :`, result);
        
        return result; // Retourne le nombre d'éléments supprimés (1 si la clé existait, 0 sinon)
    } catch (err) {
        console.error('Erreur lors de la suppression de la session:', err);
    }
}

const REFRESH_SECRET_KEY = 'votre_clé_secrète_refresh';
//const SECRET_KEY = 'votre_clé_secrète_access'; // Clé pour le token d'accès

// Fonction pour récupérer les sessions actives d'un utilisateur
async function getActiveSessions(userId) {
    try {
        await ensureRedisConnected();

        if (!userId || typeof userId !== 'string') {
            throw new TypeError(`userId doit être une chaîne valide, reçu : ${userId}`);
        }

        console.log('Récupération des sessions actives pour userId:', userId);



        const reply = await redisClient.get(userId); // Utilisation directe de ioredis

        //const reply = await getAsync(userId); // Exécute la commande Redis GET
        console.log('Réponse Redis pour userId:', reply);

        return reply ? JSON.parse(reply) : [];
    } catch (err) {
        console.error('Erreur lors de la récupération des sessions actives:', err);
        return [];
    }
}

const mysql = require('mysql2/promise');

// Configuration de la connexion MySQL
const dbConfig = {
    host: 'localhost', // Adresse IP ou nom de domaine du serveur distant
    user: 'root',             // Nom d'utilisateur
    password: '',         // Mot de passe
    database: 'admin_database',   // Base de données administrative
};



// Fonction qui agit comme `find` mais interroge la base de données
async function findUserFromDatabase(filter) {
    const connection = await mysql.createConnection(dbConfig);

    try {
        // Construire une requête dynamique basée sur les critères de filtre
        const whereClauses = [];
        const values = [];

        for (const key in filter) {
            whereClauses.push(`${key} = ?`);
            values.push(filter[key]);
        }

        // Concaténer les clauses WHERE
        const whereString = whereClauses.join(' AND ');
        const query = `SELECT * FROM users WHERE ${whereString} LIMIT 1`;

        // Exécuter la requête
        const [rows] = await connection.query(query, values);

        // Retourner le premier utilisateur trouvé, ou null si aucun
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erreur lors de la recherche dans la base de données :', error);
        throw error;
    } finally {
        await connection.end();
    }
}



// Route de connexion
app.post('/login', async (req, res) => {

    const {username,password,fullname,organization,email,phone} = req.body;
    
    //const { username, password } = req.body;

    // Vérification des champs requis
    if (!username || !password || !fullname || !email || !organization || !phone) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    // Vérifiez si l'utilisateur existe déjà
    //const user = USERS.find(user => user.username === username && user.email === email && user.phone === phone);

    try {

        const user = await findUserFromDatabase({ username, email, phone });

        console.log('details utilisateur',user);

        if (!user) {
           // res.status(200).json({ message: 'Utilisateur trouvé.', user });
            return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
        }

            
        const userId = user.Id;//USERS.find(user => user.username === username)

        const nlicences = user.licenses;
        const userfullname = user.fullname;
        

        

        //console.log('userId:',userId)
        //const userId = userid.id;

        const activeSessions =  await getActiveSessions(userId); // Attendez ici

        //console.log(activeSessions)


        // Récupérer les sessions actives pour cet utilisateur
        //const activeSessions = JSON.parse(await redisClient.getAsync(userId)) || [];

        //const nlicences = user.licences;; // Limite de sessions par utilisateur

        // Vérifiez si le nombre maximum de sessions est atteint
        if (activeSessions.length >= nlicences) {
            // Supprimer la session la plus ancienne
            //activeSessions.shift(); // Retirer le plus ancien token
            console.log('Limite de sessions atteinte')
            return res.status(401).json({ message: "Limite de sessions atteinte." });
            //return res.status(429).send("Limite de sessions atteinte");
        }



        // Vérifiez le mot de passe
        //const isPasswordValid = await bcrypt.compare(password, user.password);
        //if (!isPasswordValid) {
        //    return res.status(401).json({ message: "Mot de passe incorrect." });
        //}

        if (user.password !== password) { // Comparaison directe des mots de passe en clair
           // return { status: 401, message: "Mot de passe incorrect." };
           return res.status(401).json({ message: "Mot de passe incorrect." });
        }


        // Créez un token d'accès (accessToken)
        const accessToken = jwt.sign(
            { userId, nlicences,userfullname, subscriptionStartDate: user.subscriptionStartDate },
            SECRET_KEY,
            { expiresIn: '15m' } // Durée de vie plus courte pour l'access token
        );


        // Créez un token de rafraîchissement (refreshToken)
        const refreshToken = jwt.sign(
            { userId, nlicences, userfullname, subscriptionStartDate: user.subscriptionStartDate },
            REFRESH_SECRET_KEY,
            { expiresIn: '7d' } // Valide pendant 7 jours
        );

        
        // Ajouter le nouveau token à la liste des sessions actives
        activeSessions.push(refreshToken);

        console.log('nombre de sessions',activeSessions.length,nlicences);
        

        await ensureRedisConnected();

        // Mettre à jour les sessions actives dans Redis

        //await setAsync(userId, JSON.stringify(activeSessions), 'EX', 3600);

        await redisClient.set(userId, JSON.stringify(activeSessions), {
            EX: 604800, // Expiration en 7 jours (en secondes)
        });
        

        //await redisClient.setAsync(userId, JSON.stringify(activeSessions), 'EX', 3600);

        // Envoyez le refreshToken dans un cookie HTTP-only
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Activez uniquement en production avec HTTPS
            sameSite: 'strict', // Protège contre les attaques CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        });


        // Envoyez le token d'accès dans un cookie HTTP-only
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Empêche l'accès via JavaScript
            secure: true, // Utiliser uniquement HTTPS (à activer en production)
            sameSite: 'strict', // Protège contre les attaques CSRF
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        

        // Répondez avec l'accessToken
        res.json({ accessToken });


    } catch (error) {
        res.status(500).json({ message: 'Erreur interne.', error });
    }

    //if (!user) {
        
       // res.status(201).json({ message: "Utilisateur authentifié." });

  
    //    return res.status(400).json({ message: "Nom d'utilisateur non trouvé !" });
  
    //}
    



    // Vérifiez si l'utilisateur existe
    //const user = USERS1.find(user => user.username === username);

    //console.log('Utilisateur sélectionné:', user);

    //if (!user) {
     //   return res.status(401).json({ message: "Utilisateur non trouvé !" });
    //}


});

app.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Récupérer le Refresh Token depuis le cookie

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token manquant.' });
    }

    // Vérifier le Refresh Token
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token invalide ou expiré.' });
        }

        // Extraire les informations utilisateur depuis le token
        const { username, subscriptionStartDate } = decoded;

        // Générer un nouveau token d'accès
        const newAccessToken = jwt.sign(
            { username, subscriptionStartDate },
            SECRET_KEY,
            { expiresIn: '15m' } // Durée de vie courte pour le token d'accès
        );

        // Renvoyer le nouveau token d'accès
        res.json({ accessToken: newAccessToken });
    });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Active la gestion des cookies

//const cookieParser = require('cookie-parser');
//app.use(cookieParser()); // Active la gestion des cookies

function authenticateToken(req, res, next) {
    //const token = req.cookies.token; // Récupère le token depuis les cookies

    //const refreshToken = req.cookies.refreshToken; // Récupère le refresh token depuis les cookies
    const token = req.cookies.refreshToken;

    if (!token) {
        req.isAuthenticated = false; // Indique que l'utilisateur n'est pas authentifié
        
        return next();
    }

    try {

        const user = jwt.verify(token, REFRESH_SECRET_KEY); // Vérifie le token

        console.log('user dans le token',user);
        
        req.user = user; // Ajoute les infos utilisateur

        

        // Vérifier la durée de l'abonnement
        if (user.subscriptionStartDate) {
            //const subscriptionStartDate = new Date(user.subscriptionStartDate).getTime(); // En UTC
            //const currentDate = Date.now(); // En UTC

            const subscriptionStartDate = new Date(user.subscriptionStartDate); // Date d'abonnement
            const currentDate = new Date(); // Date actuelle

            const expirationDate = new Date(subscriptionStartDate);
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);

            //console.log('date actuelle',currentDate)
            //console.log('date abonnement',subscriptionStartDate)

            //const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // Durée d'un an en millisecondes

            if (currentDate > expirationDate) {
                console.log("Abonnement expiré : plus d'un an écoulé.");
                req.isAuthenticated = false; // Marquer comme non authentifié
                const loginPath = path.join(__dirname, 'public','page_authentification_elp_software.html');
                return res.sendFile(loginPath);
                //return res.status(403).send('Votre abonnement a expiré. Veuillez renouveler votre abonnement.');
            }

        } else {

            console.warn("Date de début de l'abonnement manquante dans le token.");
            req.isAuthenticated = false;
            return res.status(400).send("Date de début de l'abonnement manquante.");
        }

        
        // Enregistrer l'ID de l'utilisateur dans la requête
        req.userId = user.userId; // Assurez-vous que userId est présent dans le payload du token

        req.fullname = user.userfullname;

        console.log('nom de la session dans le tokenr',req.fullname)

        console.log('req.userId dans le token',req.userId)
        
        req.isAuthenticated = true; // L'utilisateur est authentifié
        next();

    } catch (err) {
        console.error("Erreur lors de la vérification du token :", err.message);
        req.isAuthenticated = false; // Le token est invalide ou expiré
        return res.status(401).send("Token invalide ou expiré.");
        
    }
}

module.exports = authenticateToken; // Exportez pour l'utiliser dans vos routes

// Middleware global pour protéger les fichiers HTML
app.use((req, res, next) => {
    const decodedPath = decodeURIComponent(req.path);


    // Vérifier si le fichier est un fichier HTML
    if (decodedPath.endsWith('.html')) {
        console.log('OUI - Fichier HTML détecté :', decodedPath);

        // Appeler la fonction d'authentification
        authenticateToken(req, res, () => {
            // Vérifier si l'utilisateur est authentifié
            if (!req.isAuthenticated) {
                console.error('Authentification échouée.');

                // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
                const loginPath = path.join(__dirname, 'public','page_authentification_elp_software.html');
                return res.sendFile(loginPath);
            }

            // Si authentifié, continuer
            console.log('Utilisateur authentifié');
            next(); // Continue vers le prochain middleware ou route
        });

        return; // Important pour éviter d'exécuter le reste du middleware
    }

    // Afficher les autres types de requêtes si nécessaire
    if (!decodedPath.includes('.')) {
        console.log('Non - Autre requête (pas un fichier statique) :', decodedPath);
    }

    next(); // Continuer pour les autres types de requêtes
});

// Servir les fichiers statiques
app.use(express.static('public'));


// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {

    //console.log('connecté à la route /protected')

    //console.log(req.userId)

    res.json({ message: `Bienvenue ${req.user.username}, vous êtes authentifié.` });

});

const fs = require('fs');
// Route pour servir la page principale de l'application
// Route pour servir la page principale de l'application
app.get('/application',authenticateToken, (req, res) => {

    
    const filePath = path.join(__dirname, 'public','PAGE_PRINCIPALE_03 11 2024 SERVEUR.html');


    // Vérification de l'existence du fichier
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error('Fichier introuvable ou inaccessible:', filePath, err);
            return res.status(404).send('Fichier introuvable.');
        }

        // Envoi du fichier si accessible
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de l\'envoi du fichier:', err);
                res.status(500).send('Erreur serveur lors du chargement du fichier.');
            }


        });
    });
});

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname));

app.post('/logout',authenticateToken, async (req, res) => {
    // Supprimez les cookies de jetons
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'strict' });

    //const userId = req.body.userId; // Supposons que vous obtenez userId depuis la requête


    // Supprimer la session
    await deleteSession(req.userId);


    //if (result) {
     //   res.status(200).json({ message: 'Session supprimée avec succès.' });
    //} else {
     //   res.status(400).json({ message: 'Erreur lors de la suppression de la session.' });
    //}

    //console.log('oui')
    
    //res.status(200).json({ message: 'Déconnexion réussie.' });

        // Redirigez vers la page directement
        //res.redirect('/page_authentification_elp_software.html');

    const loginPath = path.join(__dirname, 'public','page_authentification_elp_software.html');

    res.sendFile(loginPath);
});

//const { addUser } = require('./userService');

app.use(express.json()); // Middleware pour parser les requêtes JSON


//const bcrypt = require('bcrypt');


// Créez une fonction asynchrone pour initialiser la connexion à la base de données
//async function initializeDatabase() {
 //   const db = await mysql.createConnection({
  //      host: 'localhost',    // Changez ces valeurs si nécessaire
  //      user: 'yourUsername', // Remplacez par votre nom d'utilisateur MySQL
  //      password: 'yourPassword', // Remplacez par votre mot de passe MySQL
   //     database: 'yourDatabase' // Remplacez par le nom de votre base de données
  //  });
  // return db;
//}

// Appel de la fonction pour établir la connexion
//initializeDatabase().then(db => {
 //   console.log("Connexion à la base de données établie avec succès !");
//}).catch(error => {
 //   console.error("Erreur lors de la connexion à la base de données :", error);
//});

// Fonction pour ajouter un utilisateur à la base de données
//async function addUser(user) {
 //   const saltRounds = 10; // Nombre de tours pour le hashage
  //  try {
         //Hacher le mot de passe
   //     const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        // Préparer la requête d'insertion
    //    const query = `
   //       INSERT INTO users (username, fullname, email, organisation, phone, subscription_start_date, password)
    //        VALUES (?, ?, ?, ?, ?, ?, ?)
    //    `;

        // Exécuter la requête d'insertion
    //    const [results] = await db.execute(query, [
    //        user.username,
     //       user.fullname,
     //       user.email,
      //      user.organisation,
      //     user.phone,
      //      user.subscriptionStartDate,
     //       hashedPassword,
     //   ]);

     //  console.log("Utilisateur ajouté avec succès :", user.username);
    //    return results; // Retourne les résultats si besoin
    //    } catch (error) {
     //   console.error("Erreur lors de l'ajout de l'utilisateur :", error);
     //   throw error; // Propager l'erreur pour gestion ultérieure
     //   }
//}

//module.exports = {
  //  addUser,
//};


//async function testQuery() {
//    const db = await initializeDatabase();
//    const [rows] = await db.execute('SELECT * FROM information_schema.tables WHERE table_schema = ?', ['yourDatabase']);
//    console.log(rows);
//}

//testQuery();



// Route pour ajouter un nouvel utilisateur
app.post('/nom_utilisateur',authenticateToken, async(req, res) => {

    console.log('Nom de la session:', req.fullname )

  res.json({ username: req.fullname });

});




const mysqlDateFormat = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};




// Route pour créer une nouvelle base de données
app.post('/users', async (req, res) => {
    const {
        Idadmin,
        passwordadmin,
        Id,
        username,
        fullname,
        email,
        organisation,
        phone,
        subscriptionStartDate,
        password,
        licenses
    } = req.body;



    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur, email et mot de passe sont requis.' });
    }

    const formattedDate = mysqlDateFormat(subscriptionStartDate);

    const motdepasseadmin = 'op^$/*-+'; // Remplacez par une vraie clé secrète
    const identifiantadmin = 'abderrahimbedja';

    if (Idadmin !== identifiantadmin || passwordadmin !== motdepasseadmin) {
        return res.status(403).json({ message: 'Données administrateur invalides.' });
    }



    try {

        
        // Connexion à la base de données
        const connection = await mysql.createConnection(dbConfig);

         // Vérification de la validité de l'ID pour empêcher les injections SQL
         if (!/^[a-zA-Z0-9_]+$/.test(Id)) {
            return res.status(400).json({ message: 'ID utilisateur invalide.' });
        }
        
        // Nom de la nouvelle base de données (par exemple, basé sur l'ID utilisateur)
        const newDatabaseName = `db_${Id}`;

        // Créer une nouvelle base de données
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${newDatabaseName}`);

        // Enregistrer l'utilisateur dans une table de suivi
        await connection.query(
            `INSERT INTO users (Id, username, fullname, email, organisation, phone, subscriptionStartDate, password,licenses)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Id, username, fullname, email, organisation, phone, formattedDate, password, licenses]
        );

        await connection.end();
        res.status(200).json({ message: 'Nouvelle base de données créée avec succès.', databaseName: newDatabaseName });
    } catch (err) {
        console.error('Erreur lors de la création de la base de données :', err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});



///////////////////////////////////////////////////////SECURISATION LOGICIEL//////////////////////////////////////////////////


///////////////////////gestion tokens sessions///////////////////////////////////////////////







// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route pour servir la page HTML
//app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/CALCULS DIVERS 01 10 24 JS NODE JS.html');
    //res.sendFile(__dirname + '/SPHERE_FICTIVE_VERSION_FINALE_02 10 24 SERVEUR.html');
    //res.sendFile(__dirname + '/PAGE_PRINCIPALE_12 06 24.html');

    //res.sendFile(__dirname + '/login_mot_de_passe.html');
    
//});





// Route principale
app.get('/', authenticateToken, (req, res) => {
    //res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
    if (req.isAuthenticated) {

        // Si l'utilisateur est authentifié, redirigez vers la page principale
        const filePath = path.join(__dirname, 'public','PAGE_PRINCIPALE_03 11 2024 SERVEUR.html');
        //const filePath = path.join(__dirname, 'page_authentification_elp_software.html');
        res.sendFile(filePath);
        

    } else {
        // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
        const loginPath = path.join(__dirname, 'public','page_authentification_elp_software.html');
        res.sendFile(loginPath);
    }
});

// Route principale
app.get('/droitsadmin', (req, res) => {
    //res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });

        // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
        const loginPath = path.join(__dirname, 'public','inscription_nouvel_utilisateur.html');
        res.sendFile(loginPath);
});





app.use(express.static(__dirname));

// Route pour calculer la somme
app.post('/calculateDeltaTheta', (req, res) => {
    const { courantImpulsionnel, coefficientTemperature, resistanceOhmique, coefRepartition,sectionConducteur,densiteMateriau, capaciteThermique} = req.body;

    const Energie=0.5*(1/0.7)*Math.pow(courantImpulsionnel,2)*350;

    const deltaTheta =(1/coefficientTemperature)*(Math.exp((Energie*coefficientTemperature*resistanceOhmique*Math.pow(coefRepartition,2))/(Math.pow(sectionConducteur*0.000001,2)*densiteMateriau*capaciteThermique))-1);


    // Renvoie la somme au client
    res.json({ Energie, deltaTheta });
});

app.post('/calculateProfondeurFusion', (req, res) => {
    const { courantImpulsionnel,uac,densiteMateriau,capaciteThermique,temperatureFusion, temperatureambiante,chaleurspecifique} = req.body;

    const Q=(1/0.7)*courantImpulsionnel*1000*350E-6;

    const volumefusion = (uac*Q/densiteMateriau)*(1/(capaciteThermique*(temperatureFusion-temperatureambiante)+chaleurspecifique));

    const profondeurfusion =1000*Math.pow(volumefusion/((4/6)*Math.PI),1/3);

    res.json({ profondeurfusion });
});

app.post('/calculateSectionConducteurs', (req, res) => {
    const { courantImpulsionnel,coefficientTemperature,resistanceOhmique,coefRepartition,densiteMateriau,capaciteThermique,temperatureFusion,temperatureambiante} = req.body;

    const Energie=0.5*(1/0.7)*Math.pow(courantImpulsionnel,2)*350;
    
    const sectionConducteurs=1000000*Math.sqrt((Energie*coefficientTemperature*resistanceOhmique*Math.pow(coefRepartition,2))/(densiteMateriau*capaciteThermique*(Math.log(coefficientTemperature*(temperatureFusion-temperatureambiante)+1))));

    res.json({ sectionConducteurs });
});

app.post('/calculateSectionConducteursTerre', (req, res) => {
    const { courantcourtcircuit,dureecourtcircuit,Qc,Beta,rho20,temperatureinitiale,temperaturefinale} = req.body;

    const k=Math.sqrt((Qc*(Beta+20)/rho20)*Math.log(1+(temperaturefinale-temperatureinitiale)/(Beta+temperatureinitiale)))


    const sectionConducteurs=courantcourtcircuit*1000*Math.sqrt(dureecourtcircuit)/k

    res.json({ sectionConducteurs });
});

app.post('/calculateSectionConducteursLiaisons', (req, res) => {
    const { courantImpulsionnel,coefficientTemperature,resistanceOhmique,coefRepartition,densiteMateriau,capaciteThermique,temperatureFusion,temperatureambiante} = req.body;

    const Energie=0.5*(1/0.7)*Math.pow(courantImpulsionnel,2)*350;

    const sectionConducteurs=1000000*Math.sqrt((Energie*coefficientTemperature*resistanceOhmique*Math.pow(coefRepartition,2))/(densiteMateriau*capaciteThermique*(Math.log(coefficientTemperature*(temperatureFusion-temperatureambiante)+1))));

    res.json({ sectionConducteurs });
});

app.post('/calculangleprotection', (req, res) => {
    const { Rayonspherefictive,deletaH} = req.body;

    let rayonangleprotection = ((Rayonspherefictive *Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(deletaH - Rayonspherefictive,2)))-(((Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(deletaH - Rayonspherefictive,2))/2)*Math.sqrt(Math.pow(Rayonspherefictive,2)
    -(Math.pow(Rayonspherefictive,2)-Math.pow(deletaH - Rayonspherefictive,2)))
    +(Math.pow(Rayonspherefictive,2)/2)*(Math.asin(Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(deletaH - Rayonspherefictive,2))/ Rayonspherefictive)))-(0)))*2/ deletaH;

    let angleprotection = Math.atan(rayonangleprotection/deletaH)*180/Math.PI;

    if (deletaH<=2) {

    let a = ((Rayonspherefictive *Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(2 - Rayonspherefictive,2)))-(((Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(2 - Rayonspherefictive,2))/2)*Math.sqrt(Math.pow(Rayonspherefictive,2)
    -(Math.pow(Rayonspherefictive,2)-Math.pow(2 - Rayonspherefictive,2)))
    +(Math.pow(Rayonspherefictive,2)/2)*(Math.asin(Math.sqrt(Math.pow(Rayonspherefictive,2)
    -Math.pow(2 - Rayonspherefictive,2))/ Rayonspherefictive)))-(0)))*2/ 2;

    angleprotection = Math.atan(a/2)*180/Math.PI;

    rayonangleprotection=deletaH*Math.tan(angleprotection*Math.PI/180);

    }

  
    res.json({ angleprotection,rayonangleprotection });
});


app.post('/calculspherefictive', (req, res) => {
    const { Rayonspherefictive,deletaH} = req.body;

    var rayonprotectionsf = Math.sqrt(Math.pow(Rayonspherefictive,2)-Math.pow(deletaH-Rayonspherefictive,2));
    const deletaHMax = Rayonspherefictive;

    if (deletaH>=deletaHMax) {

        rayonprotectionsf = Rayonspherefictive;

    }


  
    res.json({ rayonprotectionsf });
});

app.post('/calculpda', (req, res) => {
    const { Rayonspherefictive,deletaH,deltaL,coefficient_icpe} = req.body;

    var rayonprotectionpda;

    if (deletaH<2) {

        rayonprotectionpda=0.;

    } else if (deletaH>=2 && deletaH<=5) {

        rayonprotectionpda = coefficient_icpe*(deletaH/5)*Math.sqrt(2*Rayonspherefictive*deletaH-Math.pow(deletaH,2)+deltaL*(2*Rayonspherefictive+deltaL));


    } else {

        const a=2*Rayonspherefictive*deletaH-Math.pow(deletaH,2)+deltaL*(2*Rayonspherefictive+deltaL);

        if (a<=0) {

            rayonprotectionpda=0;

        } else {

            rayonprotectionpda = coefficient_icpe*Math.sqrt(2*Rayonspherefictive*deletaH-Math.pow(deletaH,2)+deltaL*(2*Rayonspherefictive+deltaL));

        }

    }


  
    res.json({ rayonprotectionpda });
});

app.post('/calculprofondeurpenetrationsf', (req, res) => {
    const { deletaH1,deletaH2,distance,Rayonspherefictive} = req.body;

    const A=(deletaH1-deletaH2)/2;
    const B=-distance/(deletaH1-deletaH2);
    const C= Math.pow(distance,2)/(2*(deletaH1-deletaH2));
    const a=1+Math.pow(B,2);
    const b=2*(A+C)*B;
    const c=Math.pow(A+C,2)-Math.pow(Rayonspherefictive,2);
    const delta=Math.pow(b,2)-4*a*c;
  
    res.json({ A,B,C,a,b,c,delta });
});

app.post('/updateResultsForce', (req, res) => {

    const {courantmax,kei,kej,distancefixationsi,distanceij,y0j,y0i,x0j,x0i,angleinclinaisoni} = req.body;

    const angleforce = Math.atan2(y0j-y0i,x0j-x0i)-Math.PI/2;

    let forcelaplacetraction1,forcelaplacecisaillement1

    forcelaplacetraction1 = (2*1E-7*Math.pow(courantmax,2)*1E6*kei*kej*distancefixationsi/distanceij)*Math.cos(angleforce-angleinclinaisoni)/10;
    forcelaplacecisaillement1 = (2*1E-7*Math.pow(courantmax,2)*1E6*kei*kej*distancefixationsi/distanceij)*Math.sin(angleforce-angleinclinaisoni)/10;

    res.json({ forcelaplacetraction1,forcelaplacecisaillement1 });
});

app.post('/updateResults', (req, res) => {

    const {admittance,yt,iimp,z} = req.body;

    const impedance = 1/(admittance+yt);
    const courant = impedance*iimp/z;

    res.json({ impedance,courant });
});

app.post('/heidlerFunction', (req, res) => {

    const {imax, tau1, tau2, k,N,t_step,f_s} = req.body;
    let signal=new Array(N).fill(0);
    let time=new Array(N).fill(0);
    let magnitudes = new Array(N / 2).fill(0);
    let frequencies = new Array(N / 2).fill(0);
    let phases = new Array(N / 2).fill(0); // To store phase information
    real = new Array(N).fill(0);
    imag = new Array(N).fill(0);

    for (let i = 0; i <= N; i++) {
        const t = i * t_step;
        time[i] = t;
        
        signal[i] = (imax*1000/k)*(Math.pow(t/(tau1*1E-6),10)/(1+Math.pow(t/(tau1*1E-6),10)))*Math.exp(-t/(tau2*1E-6));
     


    }

    // DFT Calculation
    for (let k = 0; k <= N / 2; k++) { // Only need the first half
        for (let n = 0; n < N; n++) {
            real[k] += signal[n] * Math.cos(2 * Math.PI * k * n / N);
            imag[k] -= signal[n] * Math.sin(2 * Math.PI * k * n / N);
        }
        magnitudes[k] = Math.sqrt(real[k] * real[k] + imag[k] * imag[k]) / f_s; // Normalize
        phases[k] = Math.atan2(imag[k], real[k]) * 180 / Math.PI; // Phase in degrees
        frequencies[k] = k * f_s / N; // Calculate real frequencies

    }

    res.json({ time,signal,frequencies,magnitudes });

});

app.post('/calculchampmagnetiquedirectzpf1', (req, res) => {

    const {typechoc,typemateriau,W,r0,reseauequipotentialite} = req.body;
    var sf,ds

    if (typechoc=='1' || typechoc=='2') {

        if (typemateriau=='1') {

            sf=20*Math.log10(8.5/ W);


        } else {

            sf = 20*Math.log10((8.5/W)/(Math.sqrt(1+18*1E-6/Math.pow(r0,2))));


        }




    } else {

        sf=20*Math.log10(8.5/ W);

    }

    let sf1=sf;

    if (reseauequipotentialite=='1') {
        sf = sf + 20*Math.log10(2);
    }

    if (sf<0) {

    sf =0;

    }


    if (sf>=10) {

        ds = Math.pow(W,sf/10);


    } else {

        ds = W;

    }

    res.json({ sf,ds,sf1 });
});

app.post('/calculchampmagnetiqueindirectzpf1', (req, res) => {

    const {typechoc,typemateriau,W,r0,reseauequipotentialite,H0} = req.body;
    var sf,ds
    
    if (typechoc=='1' || typechoc=='2') {

        if (typemateriau=='1') {

            sf=20*Math.log10(8.5/ W);


        } else {

            sf = 20*Math.log10((8.5/W)/(Math.sqrt(1+18*1E-6/Math.pow(r0,2))));


        }

    } else {

        sf=20*Math.log10(8.5/ W);

    }

    if (reseauequipotentialite=='1') {
        sf = sf + 20*Math.log10(2);
    }

    if (sf<0) {

    sf =0;

    }


    if (sf>=10) {

        ds = Math.pow(W,sf/10);


    } else {

        ds = W;


    }

    const H1=H0/(Math.pow(10,sf/20));


    res.json({ sf, ds, H1 });
});


app.post('/calculchampmagnetiqueindirectzpf1sa', (req, res) => {

    const {hauteurbatiment,longueurbatiment,rayonspherefictive,courant} = req.body;
    
    if (hauteurbatiment>=rayonspherefictive) {

        sa=rayonspherefictive+longueurbatiment/2;

    } else  {

        sa = Math.sqrt(2*rayonspherefictive*hauteurbatiment-Math.pow(hauteurbatiment,2)) +longueurbatiment/2;

    }

    const H0=courant*1000/(2*Math.PI*sa);


    res.json({ sa, H0});

});

app.post('/calculsectionecran', (req, res) => {

    const {courantmax,resistiviteecran,longueurcable,tenuechocs,coefficientTemperature,densiteMateriau,capaciteThermique,temperaturemaximaleisolant,temperatureambiante} = req.body;
    
    const Energie=0.5*(1/0.7)*Math.pow(courantmax,2)*350;

    const Smin1 = (courantmax*resistiviteecran*longueurcable*1E6)/tenuechocs;

    const Smin2 = 1E6*Math.sqrt(Energie*coefficientTemperature*resistiviteecran/(densiteMateriau*capaciteThermique*Math.log(coefficientTemperature*(temperaturemaximaleisolant-temperatureambiante)+1)));

    res.json({ Smin1, Smin2});

});

app.post('/calcultensionaxialeul', (req, res) => {

    const {impedancecouplage,lk,nombrejd,ldf,courantmax,coefficientponderationselectedgalerie,coefficientponderation} = req.body;
    
    const ul = impedancecouplage*(lk+nombrejd*ldf)*(courantmax*coefficientponderationselectedgalerie*(2/3)/coefficientponderation);
    const courantpartielgaleriekta2206 = courantmax*coefficientponderationselectedgalerie*(2/3)/coefficientponderation;
    res.json({ ul, courantpartielgaleriekta2206});

});


app.post('/programme_principal_sphere_fictive1', (req, res) => {
//    try {
        const { Rayon_p,group_data_cube_float,group_data_cube,Nombre_points } = req.body;

        // Assurez-vous que les données existent et sont valides
     //   if (!Rayon_p || !Array.isArray(group_data_cube_float)) {
     //       throw new Error('Données manquantes ou invalides');
      //  }

        // Appel de la fonction programme_principal
        const result = programme_principal_sphere_fictive.programme_principal(Rayon_p,group_data_cube_float,group_data_cube,Nombre_points);

        const positions = result.positions;
        const snp = result.snp;

        
        
        // Réponse au client
        res.json({ positions, snp });
//    } catch (error) {
 //       console.error('Erreur lors du traitement de la requête :', error);
        // Envoi d'une réponse d'erreur 500
//        res.status(500).json({ error: 'Erreur interne du serveur' });
//    }
});

app.post('/programme_principal_sphere_fictive_pda1', (req, res) => {
    //    try {
            const { Rayon_p,group_data_cube_float,group_data_cube,Nombre_points } = req.body;
    
            // Assurez-vous que les données existent et sont valides
         //   if (!Rayon_p || !Array.isArray(group_data_cube_float)) {
         //       throw new Error('Données manquantes ou invalides');
          //  }
    
            // Appel de la fonction programme_principal
            const result = programme_principal_sphere_fictive_pda.programme_principal(Rayon_p,group_data_cube_float,group_data_cube,Nombre_points);
    
            const positions = result.positions;
            const snp = result.snp;
    
            
            
            // Réponse au client
            res.json({ positions, snp });
    //    } catch (error) {
     //       console.error('Erreur lors du traitement de la requête :', error);
            // Envoi d'une réponse d'erreur 500
    //        res.status(500).json({ error: 'Erreur interne du serveur' });
    //    }
    });



    app.post('/updateResults_arf2', (req, res) => {

        const {Ng,Ad,Am,Cd,PB,PBA,KS1,KS1A,checkboxes,zoneData,zoneDataA,zoneDatafloatA,zoneDatafloat,lineData,lineDataA,options,selected_lines} = req.body;
        

        RAS=0.00;
        RBS=0.00;
        RCS=0.00;
        RMS=0.00;
        RUS=0.00;
        RVS=0.00;
        RWS=0.00;
        RZS=0.00;
        R1S=0.00;
    
        RAA=0.00;
        RBA=0.00;
        RCA=0.00;
        RMA=0.00;
        RUA=0.00;
        RVA=0.00;
        RWA=0.00;
        RZA=0.00;
        R1A=0.00;
    
    
        //dropdownMenuZone = document.getElementById('dropdown-menu-zone');
    
        //const selectedZone = dropdownMenuZone.value;
    
        //const dropdownMenuZone = document.getElementById('dropdown-menu-zone');
    
        // Get all <option> elements within the <select>
       // const options = dropdownMenuZone.options;   
    
        ND=Ng*Ad*1e-6*Cd;
    
        var n_total=0;
        
        for (let i = 0; i < options.length; i++) {
    
            const selectedZone=options[i].text;
    
            n_total=n_total+parseFloat(zoneDatafloat[selectedZone]["nz"]);
    
        }
    
        nt=n_total;
    
    
        for (let i = 0; i < options.length; i++) {
    
            const selectedZone=options[i].text;
    
            var n_total=n_total+parseFloat(zoneDatafloat[selectedZone]["nz"]);
          
    
            ///Calcul du risque RA
            const rt = parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasValeur"]);
            const rt_am = parseFloat(zoneDataA[selectedZone]["FacteurReductionToucherPasValeur"]);
            const lt = zoneDatafloat[selectedZone]["PertesLtZoneIntValeur"];
            const pta = zoneDatafloat[selectedZone]["FacteurPAValeur"];
            const pta_am = zoneDatafloatA[selectedZone]["FacteurPAValeur"];
            const nz=parseFloat(zoneDatafloat[selectedZone]["nz"]);
            const tz=parseFloat(zoneDatafloat[selectedZone]["tz"]);
         
            ///Calcul du risque RB
            var lf = zoneDatafloat[selectedZone]["PertesLfZoneValeur"];
            var hz = parseFloat(zoneData[selectedZone]["TypeDangerParticulierValeur"]);
            var rf = parseFloat(zoneData[selectedZone]["FacteurRisqueIncendieValeur"]);
            var rp = parseFloat(zoneData[selectedZone]["PrecautionsRisqueIncendieValeur"]);
            var rp_am = parseFloat(zoneDataA[selectedZone]["PrecautionsRisqueIncendieValeur"]);
            var lbe=0.;
            var lbe_am=0.;
            var ptws=0.;
            var ptws_am=0.;
            var te=0.;
    
            if (zoneData[selectedZone]["CheckedLFE"]==true) {
    
                lbe=parseFloat(zoneData[selectedZone]["PertesLFE"])*parseFloat(zoneData[selectedZone]["PertesTeLFE"])*0.01/8760;
                lbe_am=parseFloat(zoneData[selectedZone]["PertesLFE"])*parseFloat(zoneData[selectedZone]["PertesTeLFE"])*0.01/8760;
               
    
                if (zoneData[selectedZone]["CheckedINERIS"]) {
    
                    lbe=lbe*(1-parseFloat(zoneData[selectedZone]["PTWSLFE"])/100)*rp*rf;
                    lbe_am=lbe_am*(1-parseFloat(zoneDataA[selectedZone]["PTWSLFE"])/100)*rp_am*rf;
    
                }
    
    
            }
    
            var lo = zoneDatafloat[selectedZone]["PertesLoZoneValeur"];
    
            PA=pta*PB;
            zoneData[selectedZone]["PA"]=PA;
    
            PA_am=pta_am*PBA;  
            zoneDataA[selectedZone]["PA"]=PA_am;
    
            RAS=RAS+Ng*Ad*1E-6*Cd*(rt*lt*tz*nz/(8760*nt))*PA;
            zoneData[selectedZone]["risqueRAS"]=(Ng*Ad*1E-6*Cd*(rt*lt*tz*nz/(8760*nt))*PA).toExponential(5);
    
            RAA=RAA+Ng*Ad*1E-6*Cd*(rt_am*lt*tz*nz/(8760*nt))*PA_am;       
            zoneDataA[selectedZone]["risqueRAA"]=(Ng*Ad*1E-6*Cd*(rt_am*lt*tz*nz/(8760*nt))*PA_am).toExponential(5);
        
            RBS=RBS+Ng*Ad*1E-6*Cd*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe)*PB;
            zoneData[selectedZone]["risqueRBS"]=(Ng*Ad*1E-6*Cd*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe)*PB).toExponential(5);
    
            RBA=RBA+Ng*Ad*1E-6*Cd*(lf*hz*rf*rp_am*nz*tz/(nt*8760)+lbe_am)*PBA;       
            zoneDataA[selectedZone]["risqueRBA"]=(Ng*Ad*1E-6*Cd*(lf*hz*rf*rp_am*nz*tz/(nt*8760)+lbe_am)*PBA).toExponential(5);
    
    
            //const checkboxes =document.getElementById('checkbox-container').querySelectorAll('input[type="checkbox"]');
    
            var PC=1;
            var PM=1;
            var PC_am=1;
            var PM_am=1;
    
            RUS1=0.0;
            RUA1=0.0;
            RVS1=0.0;
            RVA1=0.0;
            RWS1=0.0;
            RWA1=0.0;
            RZS1=0.0;
            RZA1=0.0;



            checkboxes.forEach((checkbox) => {
            const selectedLine = checkbox.name; 

    
            if (selected_lines[selectedZone][selectedLine]===true) {
    
    
    
                   
                    var longueur_ligne=parseFloat(lineData[selectedLine]["longueurLigne"]);
    
                    if (longueur_ligne>1000) {
                        longueur_ligne=1000.00;
    
                    }
    
                    const longueur_bat_ext=parseFloat(lineData[selectedLine]["longueurStructureExt"]);
                    const largeur_bat_ext=parseFloat(lineData[selectedLine]["largeurStructureExt"]);
                    const hauteur_bat_ext=parseFloat(lineData[selectedLine]["hauteurStructureExt"]);
                    const Cdj=parseFloat(lineData[selectedLine]["emplacementRelatifStructureExtValeur"]);
                    const Ci=parseFloat(lineData[selectedLine]["facteurInstallationLigneValeur"]);
                    const Ct=parseFloat(lineData[selectedLine]["facteurTransformateurValeur"]);
                    const Ce=parseFloat(lineData[selectedLine]["typeEnvironnementLigneValeur"]);
    
                    const PPARAFOUDRE=parseFloat(lineData[selectedLine]["parafoudresCoordonnesPspdValeur"]);
                    const PPARAFOUDRE_am=parseFloat(lineDataA[selectedLine]["parafoudresCoordonnesPspdValeur"]);
    
                    const PEB=parseFloat(lineData[selectedLine]["parafoudresPEBValeur"]);
                    const PEB_am=parseFloat(lineDataA[selectedLine]["parafoudresPEBValeur"]);
    
                    const PLD=parseFloat(lineData[selectedLine]["typeCablageExternePLDValeur"]);
                    const PLD_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLDValeur"]);
    
                    const PLI=parseFloat(lineData[selectedLine]["typeCablageExternePLIValeur"]);
                    const PLI_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLIValeur"]);
    
                    const CLD=parseFloat(lineData[selectedLine]["conditionsBlindageCLDValeur"]);
                    const CLD_am=parseFloat(lineDataA[selectedLine]["conditionsBlindageCLDValeur"]);
    
                    const CLI=parseFloat(lineData[selectedLine]["conditionsBlindageCLIValeur"]);
    
                    const KS2=parseFloat(zoneData[selectedZone]["EcranSpatialKS2Valeur"]);
                    const KS2_am=parseFloat(zoneDataA[selectedZone]["EcranSpatialKS2Valeur"]);
    
                    const KS3=parseFloat(lineData[selectedLine]["typeCablageInterneValeur"]);
                    const KS3_am=parseFloat(lineDataA[selectedLine]["typeCablageInterneValeur"]);
    
                    const KS4=parseFloat(lineData[selectedLine]["tensionAssigneeValeur"]);
    
                    const PTU=parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasPTUValeur"]);
                    const PTU_am=parseFloat(zoneDataA[selectedZone]["FacteurReductionToucherPasPTUValeur"]);
    
                    const KMS=KS1*KS2*KS3*KS4;
                    lineData[selectedLine]["KMS"]=KMS.toFixed(5);
    
                    const KMS_am=KS1A*KS2_am*KS3_am*KS4;
                    lineDataA[selectedLine]["KMS"]=KMS_am.toFixed(5);
    
                    const k_isolement=lineData[selectedLine]["interfacesIsolement"]
                    const k_isolement_am=lineDataA[selectedLine]["interfacesIsolement"]
    
                    var PMS;
                    var PMS_am;
    
                    PMS=k_isolement*Math.pow(KMS,2);
    
                    lineData[selectedLine]["PMS"]=PMS.toFixed(5);
    
                    PMS_am=k_isolement_am*Math.pow(KMS_am,2);
                    lineDataA[selectedLine]["PMS"]=PMS_am.toFixed(5);
                   
                    lineData[selectedLine]["PM"]=PMS.toFixed(5);
                    lineDataA[selectedLine]["PM"]=PMS_am.toFixed(5);
    
                    PM=PM*(1-PMS);
                    PM_am=PM_am*(1-PMS_am);
    
                    PCC=PPARAFOUDRE*CLD;
                    lineData[selectedLine]["PC"]=PCC.toFixed(5);
    
                    PCC_am=PPARAFOUDRE_am*CLD_am;
                    lineDataA[selectedLine]["PC"]=PCC_am.toFixed(5);
    
                    PC=PC*(1-PCC);
                    PC_am=PC_am*(1-PCC_am);
    
                    PU=PTU*PEB*PLD*CLD;
                    zoneData[selectedZone]["PU"]=PU.toFixed(5);
    
                    PU_am=PTU_am*PEB_am*PLD_am*CLD_am;
                    zoneDataA[selectedZone]["PU"]=PU_am.toFixed(5);
    
                    PV=PEB*PLD*CLD;
                    zoneData[selectedZone]["PV"]=PV.toFixed(5);
    
                    PV_am=PEB_am*PLD_am*CLD_am;
                    zoneDataA[selectedZone]["PV"]=PV_am.toFixed(5);
    
                    PW=PPARAFOUDRE*PLD*CLD;
                    lineData[selectedLine]["PW"]=PW.toFixed(5);
    
                    PW_am=PPARAFOUDRE_am*PLD_am*CLD_am;
                    lineDataA[selectedLine]["PW"]=PW_am.toFixed(5);
    
                    PZ=PPARAFOUDRE*PLI*CLI;
                    lineData[selectedLine]["PW"]=PZ.toFixed(5);
    
                    PZ_am=PPARAFOUDRE_am*PLI_am*CLI;
                    lineDataA[selectedLine]["PW"]=PZ_am.toFixed(5);
    
                    Adj=(longueur_bat_ext*largeur_bat_ext)+3*2*hauteur_bat_ext*(longueur_bat_ext+largeur_bat_ext)+Math.PI*Math.pow(3*hauteur_bat_ext,2);
                    lineData[selectedLine]["Ada"]=Adj.toFixed(2);
    
                    NDj=Ng*Adj*Cdj*Ct*1e-6;
                    lineData[selectedLine]["NDa"]=NDj.toFixed(4);
    
                    Al=40*longueur_ligne;
                    
                    NL=Ng*Al*Ci*Ct*Ce*1e-6;
                    
                    Ai=4000*longueur_ligne;
                    lineData[selectedLine]["Ai"]=Ai.toFixed(2);
    
                    Nl=Ng*Ai*Ce*Ci*Ct*1e-6;
                    lineData[selectedLine]["Nl"]=Nl.toFixed(4);
    
                    lineData[selectedLine]["Al"]=Al.toFixed(2);
                    lineData[selectedLine]["NL"]=NL.toFixed(4);
    
                    const rt = parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasValeur"]);
                    const rt_am = parseFloat(zoneDataA[selectedZone]["FacteurReductionToucherPasValeur"]);
                    const lt = zoneDatafloat[selectedZone]["PertesLtZoneIntValeur"];
                    const lo = zoneDatafloat[selectedZone]["PertesLoZoneValeur"];
                
                    const pa_int = zoneDatafloat[selectedZone]["FacteurPAValeur"];
                    const pa_int_am = zoneDatafloatA[selectedZone]["FacteurPAValeur"];
    
                    RUS=RUS+(NDj+NL)*rt*PU*(lt*tz*nz/(nt*8760));
                    RUS1=RUS1+(NDj+NL)*rt*PU*(lt*tz*nz/(nt*8760));
    
                    RUA=RUA+(NDj+NL)*rt*PU_am*(lt*tz*nz/(nt*8760));
                    RUA1=RUA1+(NDj+NL)*rt*PU_am*(lt*tz*nz/(nt*8760));
    
                    RVS=RVS+(NDj+NL)*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe)*PV;


                    RVS1=RVS1+(NDj+NL)*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe)*PV;
    
                    RVA=RVA+(NDj+NL)*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe_am)*PV_am;
                    RVA1=RVA1+(NDj+NL)*(lf*hz*rf*rp*nz*tz/(nt*8760)+lbe_am)*PV_am;
    
                    RWS=RWS+(NDj+NL)*lo*nz*tz/(nt*8760)*PW;
                    RWS1=RWS1+(NDj+NL)*lo*nz*tz/(nt*8760)*PW;
    
                    RWA=RWA+(NDj+NL)*lo*nz*tz/(nt*8760)*PW_am;
                    RWA1=RWA1+(NDj+NL)*lo*nz*tz/(nt*8760)*PW_am;
    
                    RZS=RZS+Nl*PZ*lo*nz*tz/(nt*8760);
                    RZS1=RZS1+Nl*PZ*lo*nz*tz/(nt*8760);
    
                    RZA=RZA+Nl*PZ_am*lo*nz*tz/(nt*8760);
                    RZA1=RZA1+Nl*PZ_am*lo*nz*tz/(nt*8760);
    
            }
      
            });
    
            zoneData[selectedZone]["risqueRUS"]=RUS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRUA"]=RUA1.toExponential(5);
            zoneData[selectedZone]["risqueRVS"]=RVS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRVA"]=RVA1.toExponential(5);
            zoneData[selectedZone]["risqueRWS"]=RWS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRWA"]=RWA1.toExponential(5);
            zoneData[selectedZone]["risqueRZS"]=RZS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRZA"]=RZA1.toExponential(5);
    
            PC=1-PC;
            zoneData[selectedZone]["PC"]=PC.toFixed(5);
            
            PC_am=1-PC_am;
            zoneDataA[selectedZone]["PC"]=PC_am.toFixed(5);
    
            PM=1-PM;
            zoneData[selectedZone]["PM"]=PM.toFixed(5);
    
            PM_am=1-PM_am;
            zoneDataA[selectedZone]["PM"]=PM_am.toFixed(5);
    
            Nm=Am*Ng*1e-6;
    
            RCS=RCS+Ng*Ad*1e-6*Cd*lo*nz*tz/(nt*8760)*PC;
            zoneData[selectedZone]["risqueRCS"]=(Ng*Ad*1e-6*Cd*lo*nz*tz/(nt*8760)*PC).toExponential(5);
    
            RCA=RCA+Ng*Ad*1e-6*Cd*lo*nz*tz/(nt*8760)*PC_am;
            zoneDataA[selectedZone]["risqueRCA"]=(Ng*Ad*1e-6*Cd*lo*nz*tz/(nt*8760)*PC_am).toExponential(5);
    
            RMS=RMS+Nm*lo*nz*tz/(nt*8760)*PM;
            zoneData[selectedZone]["risqueRMS"]=(Nm*lo*nz*tz/(nt*8760)*PM).toExponential(5);
    
            RMA=RMA+Nm*lo*nz*tz/(nt*8760)*PM_am;
            zoneDataA[selectedZone]["risqueRMA"]=(Nm*lo*nz*tz/(nt*8760)*PM_am).toExponential(5);
        
    
            
        }
    
    


        res.json({RAS,RAA,RBS,RBA,RCS,RCA,RMS,RMA,RUS,RUA,RVS,RVA,RWS,RWA,RZS,RZA,zoneData,zoneDataA,lineData,lineDataA});


    
    });





    app.post('/updateResults_arf1', (req, res) => {

        const {Ng,Ad,Am,Cd,PB,PBA,KS1,KS1A,Ha,checkboxes,zoneData,zoneDataA,zoneDatafloatA,zoneDatafloat,lineData,lineDataA,options,selected_lines} = req.body;
        

        RAS=0.00;
        RBS=0.00;
        RCS=0.00;
        RMS=0.00;
        RUS=0.00;
        RVS=0.00;
        RWS=0.00;
        RZS=0.00;
        R1S=0.00;
    
        RAA=0.00;
        RBA=0.00;
        RCA=0.00;
        RMA=0.00;
        RUA=0.00;
        RVA=0.00;
        RWA=0.00;
        RZA=0.00;
        R1A=0.00;
    
    
    
        ND=Ng*Ad*1e-6*Cd;

        for (let i = 0; i < options.length; i++) {
    
            const selectedZone=options[i].text;
    
            
    
            ///Calcul du risque RA
            const ra = parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasValeur"]);
            const lt_ext = zoneDatafloat[selectedZone]["PertesLtZoneExtValeur"];
            const pa_ext = zoneDatafloat[selectedZone]["FacteurPAValeur"];
            const pa_ext_am = zoneDatafloatA[selectedZone]["FacteurPAValeur"];
       
            RAS=RAS+Ng*Ad*1e-6*Cd*lt_ext*ra*pa_ext;
            zoneData[selectedZone]["risqueRAS"]=(Ng*Ad*1e-6*Cd*lt_ext*ra*pa_ext).toExponential(5);
            
            RAA=RAA+Ng*Ad*1e-6*Cd*lt_ext*ra*pa_ext_am;
            zoneDataA[selectedZone]["risqueRAA"]=(Ng*Ad*1e-6*Cd*lt_ext*ra*pa_ext_am).toExponential(5);
    
            ///Calcul du risque RB
            var lf = zoneDatafloat[selectedZone]["PertesLfZoneValeur"];
            var hz = parseFloat(zoneData[selectedZone]["TypeDangerParticulierValeur"]);
            var rf = parseFloat(zoneData[selectedZone]["FacteurRisqueIncendieValeur"]);
            var rp = parseFloat(zoneData[selectedZone]["PrecautionsRisqueIncendieValeur"]);
            var rp_am = parseFloat(zoneDataA[selectedZone]["PrecautionsRisqueIncendieValeur"]);
    
            var lo = zoneDatafloat[selectedZone]["PertesLoZoneValeur"];
        
            RBS=RBS+Ng*Ad*1E-6*Cd*lf*hz*rf*rp*PB;
            zoneData[selectedZone]["risqueRBS"]=(Ng*Ad*1E-6*Cd*lf*hz*rf*rp*PB).toExponential(5);
    
            RBA=RBA+Ng*Ad*1E-6*Cd*lf*hz*rf*rp_am*PBA;       
            zoneDataA[selectedZone]["risqueRBA"]=(Ng*Ad*1E-6*Cd*lf*hz*rf*rp_am*PBA).toExponential(5);
              
            //const checkboxes =document.getElementById('checkbox-container').querySelectorAll('input[type="checkbox"]');
    
            var PC=1;
            var PM=1;
            var PC_am=1;
            var PM_am=1;
            
    
            
            RUS1=0.0;
            RUA1=0.0;
            RVS1=0.0;
            RVA1=0.0;
            RWS1=0.0;
            RWA1=0.0;
            RZS1=0.0;
            RZA1=0.0;
    
    
            checkboxes.forEach((checkbox) => {
            const selectedLine = checkbox.name;
    
            
    
    
    
            if (selected_lines[selectedZone][selectedLine]===true) {
    
    
    
                if (lineData[selectedLine]["typeCheminement"]=='enterre') {
    
                    
                    var longueur_ligne=parseFloat(lineData[selectedLine]["longueurLigne"]);
    
                    if (longueur_ligne>1000) {
                        longueur_ligne=1000.00;
    
                    }
    
                    const resistivite_sol=parseFloat(lineData[selectedLine]["resistiviteSol"]);
                    const longueur_bat_ext=parseFloat(lineData[selectedLine]["longueurStructureExt"]);
                    const largeur_bat_ext=parseFloat(lineData[selectedLine]["largeurStructureExt"]);
                    const hauteur_bat_ext=parseFloat(lineData[selectedLine]["hauteurStructureExt"]);
                    const Cda=parseFloat(lineData[selectedLine]["emplacementRelatifStructureExtValeur"]);
                    const Cdl=parseFloat(lineData[selectedLine]["emplacementRelatifLigneValeur"]);
                    const Ct=parseFloat(lineData[selectedLine]["facteurTransformateurValeur"]);
                    const Ce_ligne=parseFloat(lineData[selectedLine]["typeEnvironnementLigneValeur"]);
    
                    const PSPD=parseFloat(lineData[selectedLine]["parafoudresCoordonnesPspdValeur"]);
                    const PSPD_am=parseFloat(lineDataA[selectedLine]["parafoudresCoordonnesPspdValeur"]);
    
                    const PEB=parseFloat(lineData[selectedLine]["parafoudresPEBValeur"]);
                    const PEB_am=parseFloat(lineDataA[selectedLine]["parafoudresPEBValeur"]);
    
                    const PLD=parseFloat(lineData[selectedLine]["typeCablageExternePLDValeur"]);
                    const PLD_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLDValeur"]);
    
                    const PLI=parseFloat(lineData[selectedLine]["typeCablageExternePLIValeur"]);
                    const PLI_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLIValeur"]);
    
                    const KS2=parseFloat(zoneData[selectedZone]["EcranSpatialKS2Valeur"]);
                    const KS2_am=parseFloat(zoneDataA[selectedZone]["EcranSpatialKS2Valeur"]);
    
                    const KS3=parseFloat(lineData[selectedLine]["typeCablageInterneValeur"]);
                    const KS3_am=parseFloat(lineDataA[selectedLine]["typeCablageInterneValeur"]);
    
                    const KS4=parseFloat(lineData[selectedLine]["tensionAssigneeValeur"]);
                    const KMS=KS1*KS2*KS3*KS4;
                    lineData[selectedLine]["KMS"]=KMS.toFixed(5);
    
    
    
                    const KMS_am=KS1A*KS2_am*KS3_am*KS4;
                    lineDataA[selectedLine]["KMS"]=KMS_am.toFixed(5);
    
                    var PMS;
                    var PMS_am;
    
    
                    
                   if (KMS>=0.4) {
    
                        PMS=1.00;
    
                    } else if (KMS>=0.15 && KMS<0.4) {
    
                        PMS=(1-0.9)*(KMS-0.15)/(0.4-0.15)+0.9;
    
                    } else if (KMS>=0.07 && KMS<0.15) {
    
                        PMS=(0.9-0.5)*(KMS-0.07)/(0.15-0.07)+0.5;
    
                        //PMS=0.5;
    
                    } else if (KMS>=0.035 && KMS<0.07) {
    
                        PMS=(0.5-0.1)*(KMS-0.035)/(0.07-0.035)+0.1;
    
                        //PMS=0.5;
    
                    } else if (KMS>=0.021 && KMS<0.035) {
    
                        PMS=(0.1-0.01)*(KMS-0.021)/(0.035-0.021)+0.01;
    
                        //PMS=0.1;
    
                    } else if (KMS>=0.016 && KMS<0.021) {
    
                        //PMS=0.01;
    
                        PMS=(0.01-0.005)*(KMS-0.016)/(0.021-0.016)+0.005;
    
                    } else if (KMS>=0.015 && KMS<0.016) {
    
                        //PMS=0.005;
                        PMS=(0.005-0.003)*(KMS-0.015)/(0.016-0.015)+0.003;
    
                    } else if (KMS>=0.014 && KMS<0.015) {
    
                        //PMS=0.003;
                        PMS=(0.003-0.001)*(KMS-0.014)/(0.015-0.014)+0.001;
    
                    } else if (KMS>=0.013 && KMS<0.014) {
    
                        //PMS=0.001;
                        PMS=(0.001-0.0001)*(KMS-0.013)/(0.014-0.013)+0.0001;
    
                    } else if (KMS<=0.013) {
    
                        PMS=0.0001;
                        
                    }
    
                    lineData[selectedLine]["PMS"]=PMS.toFixed(5);
    
    
                                    
                    if (KMS_am>=0.4) {
    
                        PMS_am=1.00;
    
                    } else if (KMS_am>=0.15 && KMS_am<0.4) {
    
                        PMS_am=(1-0.9)*(KMS_am-0.15)/(0.4-0.15)+0.9;
    
                    } else if (KMS_am>=0.07 && KMS_am<0.15) {
    
                        PMS_am=(0.9-0.5)*(KMS_am-0.07)/(0.15-0.07)+0.5;
    
                        //PMS=0.5;
    
                    } else if (KMS_am>=0.035 && KMS_am<0.07) {
    
                        PMS_am=(0.5-0.1)*(KMS_am-0.035)/(0.07-0.035)+0.1;
    
                        //PMS=0.5;
    
                    } else if (KMS_am>=0.021 && KMS_am<0.035) {
    
                        PMS_am=(0.1-0.01)*(KMS_am-0.021)/(0.035-0.021)+0.01;
    
                        //PMS=0.1;
    
                    } else if (KMS_am>=0.016 && KMS_am<0.021) {
    
                        //PMS=0.01;
    
                        PMS=(0.01-0.005)*(KMS_am-0.016)/(0.021-0.016)+0.005;
    
                    } else if (KMS_am>=0.015 && KMS_am<0.016) {
    
                        //PMS=0.005;
                        PMS_am=(0.005-0.003)*(KMS_am-0.015)/(0.016-0.015)+0.003;
    
                    } else if (KMS_am>=0.014 && KMS_am<0.015) {
    
                        //PMS=0.003;
                        PMS_am=(0.003-0.001)*(KMS_am-0.014)/(0.015-0.014)+0.001;
    
                    } else if (KMS_am>=0.013 && KMS_am<0.014) {
    
                        //PMS=0.001;
                        PMS_am=(0.001-0.0001)*(KMS_am-0.013)/(0.014-0.013)+0.0001;
    
                    } else if (KMS_am<=0.013) {
    
                        PMS_am=0.0001;
                        
                    }
    
                    lineDataA[selectedLine]["PMS"]=PMS_am.toFixed(5);
    
    
    
    
    
    
    
                    
    
                    if (PEB<=PLD) {
                        PV=PEB;
    
    
                    } else {
                        PV=PLD;
    
                    }
    
                    lineData[selectedLine]["PV"]=PV.toFixed(3);
    
                    if (PEB<=PLD) {
                        PU=PEB;
    
    
                    } else {
                        PU=PLD;
    
                    }
    
                    lineData[selectedLine]["PU"]=PU.toFixed(3);;
    
                    if (PMS>=PSPD) {
    
                        PML=PSPD;
    
                    } else {
    
                        PML=PMS;
    
                    }
    
                    lineData[selectedLine]["PM"]=PML.toFixed(5);
    
                    PM=PM*(1-PML);
    
    
                    if (PSPD<=PLD) {
                        PW=PSPD;
    
    
                    } else {
                        PW=PLD;
    
                    }
    
                    lineData[selectedLine]["PW"]=PW.toFixed(3);
    
                    
                    if (PSPD<=PLI) {
                        PZ=PSPD;
    
    
                    } else {
                        PZ=PLI;
    
                    }
    
                    lineData[selectedLine]["PZ"]=PZ.toFixed(3);
                    lineData[selectedLine]["PC"]=PSPD.toFixed(3);
    
                    PC=PC*(1-PSPD);
    
    
                    if (PEB_am<=PLD_am) {
                        PV_am=PEB_am;
    
    
                    } else {
                        PV_am=PLD_am;
    
                    }
    
                    lineDataA[selectedLine]["PV"]=PV_am.toFixed(3);
    
                    if (PEB_am<=PLI_am) {
                        PU_am=PEB_am;
    
    
                    } else {
                        PU_am=PLI_am;
    
                    }
    
                    lineDataA[selectedLine]["PU"]=PU_am.toFixed(3);
    
                    if (PMS_am>=PSPD_am) {
    
                        PML_am=PSPD_am;
    
                    } else {
    
                        PML_am=PMS_am;
                    }
    
                    PM_am=PM_am*(1-PML_am);
    
                    lineDataA[selectedLine]["PM"]=PML_am.toFixed(3);
    
    
                    if (PSPD_am<=PLD_am) {
                        PW_am=PSPD_am;
    
    
                    } else {
                        PW_am=PLD_am;
    
                    }
    
                    lineDataA[selectedLine]["PW"]=PW_am.toFixed(3);
    
                    
                    if (PSPD_am<=PLI_am) {
                        PZ_am=PSPD_am;
    
    
                    } else {
                        PZ_am=PLI_am;
    
                    }
    
                    lineDataA[selectedLine]["PZ"]=PZ_am.toFixed(3);
                    lineDataA[selectedLine]["PC"]=PSPD_am.toFixed(3);
    
                    PC_am=PC_am*(1-PSPD_am);
    
    
    
                    
                    
    
    
                    
    
                    
    
    
                    Ada=(longueur_bat_ext*largeur_bat_ext)+3*2*hauteur_bat_ext*(longueur_bat_ext+largeur_bat_ext)+Math.PI*Math.pow(3*hauteur_bat_ext,2);
                    lineData[selectedLine]["Ada"]=Ada.toFixed(2);
    
                    NDa=Ng*Ada*Cda*Ct*1e-6;
                    lineData[selectedLine]["NDa"]=NDa.toFixed(4);
    
                    Al=(longueur_ligne-3*(hauteur_bat_ext+Ha))*Math.sqrt(resistivite_sol);
                    
    
                    NL=Ng*(longueur_ligne-3*(hauteur_bat_ext+Ha))*Math.sqrt(resistivite_sol)*Cdl*Ct*1e-6;
                    
    
                    Ai=(25*longueur_ligne)*Math.sqrt(resistivite_sol);
                    lineData[selectedLine]["Ai"]=Ai.toFixed(2);
    
                    Nl=Ng*(25*longueur_ligne)*Math.sqrt(resistivite_sol)*Ce_ligne*Ct*1e-6;
                    lineData[selectedLine]["Nl"]=Nl.toFixed(4);
    
    
                    if (NL<0) {
    
                        NL=0.00;
                        Al=0.00;
                    }
    
                    lineData[selectedLine]["Al"]=Al.toFixed(2);
                    lineData[selectedLine]["NL"]=NL.toFixed(4);
    
    
    
                    var NL_Nl=Nl-NL;
    
                    if (NL_Nl<0) {
    
                        NL_Nl=0.00;
    
                    }
    
    
                    const ru = parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasValeur"]);
                    const ru_am = parseFloat(zoneDataA[selectedZone]["FacteurReductionToucherPasValeur"]);
                    const lt_int = zoneDatafloat[selectedZone]["PertesLtZoneIntValeur"];
                    const lo = zoneDatafloat[selectedZone]["PertesLoZoneValeur"];
                
                    const pa_int = zoneDatafloat[selectedZone]["FacteurPAValeur"];
                    const pa_int_am = zoneDatafloatA[selectedZone]["FacteurPAValeur"];
    
                    RUS=RUS+(NDa+NL)*ru*pa_int*lt_int*PU;
                    RUS1=RUS1+(NDa+NL)*ru*pa_int*lt_int*PU;
    
                    RUA=RUA+(NDa+NL)*ru_am*pa_int_am*lt_int*PU_am;
                    RUA1=RUA1+(NDa+NL)*ru_am*pa_int_am*lt_int*PU_am;
    
                    RVS=RVS+(NDa+NL)*lf*hz*rf*rp*PV;
                    RVS1=RVS1+(NDa+NL)*lf*hz*rf*rp*PV;
    
                    RVA=RVA+(NDa+NL)*lf*hz*rf*rp_am*PV_am;
                    RVA1=RVA1+(NDa+NL)*lf*hz*rf*rp_am*PV_am;
    
                    RWS=RWS+(NDa+NL)*lo*PW;
                    RWS1=RWS1+(NDa+NL)*lo*PW;
    
                    RWA=RWA+(NDa+NL)*lo*PW_am;
                    RWA1=RWA1+(NDa+NL)*lo*PW_am;
    
                    RZS=RZS+NL_Nl*PZ*lo;
                    RZS1=RZS1+NL_Nl*PZ*lo;
    
                    RZA=RZA+NL_Nl*PZ_am*lo;
                    RZA1=RZA1+NL_Nl*PZ_am*lo;
    
    
                } else {
    
    
                    var longueur_ligne=parseFloat(lineData[selectedLine]["longueurLigne"]);
    
                    if (longueur_ligne>1000) {
                        longueur_ligne=1000.00;
    
                    }
                    
                    const hauteur_ligne=parseFloat(lineData[selectedLine]["hauteurLigne"]);
                    const longueur_bat_ext=parseFloat(lineData[selectedLine]["longueurStructureExt"]);
                    const largeur_bat_ext=parseFloat(lineData[selectedLine]["largeurStructureExt"]);
                    const hauteur_bat_ext=parseFloat(lineData[selectedLine]["hauteurStructureExt"]);
                    const Cda=parseFloat(lineData[selectedLine]["emplacementRelatifStructureExtValeur"]);
                    const Cdl=parseFloat(lineData[selectedLine]["emplacementRelatifLigneValeur"]);
                    const Ct=parseFloat(lineData[selectedLine]["facteurTransformateurValeur"]);
                    const Ce_ligne=parseFloat(lineData[selectedLine]["typeEnvironnementLigneValeur"]);
                    const PSPD=parseFloat(lineData[selectedLine]["parafoudresCoordonnesPspdValeur"]);
                    const PSPD_am=parseFloat(lineDataA[selectedLine]["parafoudresCoordonnesPspdValeur"]);
    
                    const PEB=parseFloat(lineData[selectedLine]["parafoudresPEBValeur"]);
                    const PEB_am=parseFloat(lineDataA[selectedLine]["parafoudresPEBValeur"]);
    
                    const PLD=parseFloat(lineData[selectedLine]["typeCablageExternePLDValeur"]);
                    const PLD_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLDValeur"]);
    
                    const PLI=parseFloat(lineData[selectedLine]["typeCablageExternePLIValeur"]);
                    const PLI_am=parseFloat(lineDataA[selectedLine]["typeCablageExternePLIValeur"]);
    
                    const KS2=zoneDatafloat[selectedZone]["FacteurPAValeur"];
                    const KS2_am=zoneDatafloatA[selectedZone]["FacteurPAValeur"];
    
                    const KS3=parseFloat(lineData[selectedLine]["typeCablageInterneValeur"]);
                    const KS3_am=parseFloat(lineDataA[selectedLine]["typeCablageInterneValeur"]);
    
                    const KS4=parseFloat(lineData[selectedLine]["tensionAssigneeValeur"]);
    
                    const KMS=KS1*KS2*KS3*KS4;
                    lineData[selectedLine]["KMS"]=KMS.toFixed(5);
    
                    const KMS_am=KS1A*KS2_am*KS3_am*KS4;
                    lineDataA[selectedLine]["KMS"]=KMS_am.toFixed(5);
    
                    var PMS;
                    var PMS_am;
                    var PZ,PZ_am
    
                    
                    if (KMS>=0.4) {
    
                        PMS=1.00;
    
                    } else if (KMS>=0.15 && KMS<0.4) {
    
                        PMS=(1-0.9)*(KMS-0.15)/(0.4-0.15)+0.9;
    
                    } else if (KMS>=0.07 && KMS<0.15) {
    
                        PMS=(0.9-0.5)*(KMS-0.07)/(0.15-0.07)+0.5;
    
                        //PMS=0.5;
    
                    } else if (KMS>=0.035 && KMS<0.07) {
    
                        PMS=(0.5-0.1)*(KMS-0.035)/(0.07-0.035)+0.1;
    
                        //PMS=0.5;
    
                    } else if (KMS>=0.021 && KMS<0.035) {
    
                        PMS=(0.1-0.01)*(KMS-0.021)/(0.035-0.021)+0.01;
    
                        //PMS=0.1;
    
                    } else if (KMS>=0.016 && KMS<0.021) {
    
                        //PMS=0.01;
    
                        PMS=(0.01-0.005)*(KMS-0.016)/(0.021-0.016)+0.005;
    
                    } else if (KMS>=0.015 && KMS<0.016) {
    
                        //PMS=0.005;
                        PMS=(0.005-0.003)*(KMS-0.015)/(0.016-0.015)+0.003;
    
                    } else if (KMS>=0.014 && KMS<0.015) {
    
                        //PMS=0.003;
                        PMS=(0.003-0.001)*(KMS-0.014)/(0.015-0.014)+0.001;
    
                    } else if (KMS>=0.013 && KMS<0.014) {
    
                        //PMS=0.001;
                        PMS=(0.001-0.0001)*(KMS-0.013)/(0.014-0.013)+0.0001;
    
                    } else if (KMS<=0.013) {
    
                        PMS=0.0001;
                        
                    }
    
                    lineData[selectedLine]["PMS"]=PMS.toFixed(5);
    
    
                    if (KMS_am>=0.4) {
    
                        PMS_am=1.00;
    
                    } else if (KMS_am>=0.15 && KMS_am<0.4) {
    
                        PMS_am=(1-0.9)*(KMS_am-0.15)/(0.4-0.15)+0.9;
    
                    } else if (KMS_am>=0.07 && KMS_am<0.15) {
    
                        PMS_am=(0.9-0.5)*(KMS_am-0.07)/(0.15-0.07)+0.5;
    
                        //PMS=0.5;
    
                    } else if (KMS_am>=0.035 && KMS_am<0.07) {
    
                        PMS_am=(0.5-0.1)*(KMS_am-0.035)/(0.07-0.035)+0.1;
    
                        //PMS=0.5;
    
                    } else if (KMS_am>=0.021 && KMS_am<0.035) {
    
                        PMS_am=(0.1-0.01)*(KMS_am-0.021)/(0.035-0.021)+0.01;
    
                        //PMS=0.1;
    
                    } else if (KMS_am>=0.016 && KMS_am<0.021) {
    
                        //PMS=0.01;
    
                        PMS_am=(0.01-0.005)*(KMS_am-0.016)/(0.021-0.016)+0.005;
    
                    } else if (KMS_am>=0.015 && KMS_am<0.016) {
    
                        //PMS=0.005;
                        PMS_am=(0.005-0.003)*(KMS_am-0.015)/(0.016-0.015)+0.003;
    
                    } else if (KMS_am>=0.014 && KMS_am<0.015) {
    
                        //PMS=0.003;
                        PMS_am=(0.003-0.001)*(KMS_am-0.014)/(0.015-0.014)+0.001;
    
                    } else if (KMS_am>=0.013 && KMS_am<0.014) {
    
                        //PMS=0.001;
                        PMS_am=(0.001-0.0001)*(KMS_am-0.013)/(0.014-0.013)+0.0001;
    
                    } else if (KMS_am<=0.013) {
    
                        PMS_am=0.0001;
                        
                    }
    
                    lineDataA[selectedLine]["PMS"]=PMS_am.toFixed(5);
    
    
    
    
                    if (PEB<=PLD) {
                        PV=PEB;
    
    
                    } else {
                        PV=PLD;
    
                    }
    
                    lineData[selectedLine]["PV"]=PV.toFixed(3);
    
                    if (PEB<=PLD) {
                        PU=PEB;
    
    
                    } else {
                        PU=PLD;
    
                    }
    
                    lineData[selectedLine]["PU"]=PU.toFixed(5);
    
    
                    if (PMS>=PSPD) {
    
                        PML=PSPD;
    
                    } else {
    
                        PML=PMS;
    
                    }
    
                    lineData[selectedLine]["PM"]=PML.toFixed(5);
    
                    PM=PM*(1-PML);
    
                    if (PSPD<=PLD) {
                        PW=PSPD;
    
    
                    } else {
                        PW=PLD;
    
                    }
    
                    lineData[selectedLine]["PW"]=PW.toFixed(3);
    
                    if (PSPD<=PLI) {
                        PZ=PSPD;
    
    
                    } else {
                        PZ=PLI;
    
                    }
    
                    lineData[selectedLine]["PZ"]=PZ.toFixed(3);
                    lineData[selectedLine]["PC"]=PSPD.toFixed(3);
    
                    PC=PC*(1-PSPD);
    
    
    
    
    
    
    
    
                    if (PEB_am<=PLD_am) {
                        PV_am=PEB_am;
    
    
                    } else {
                        PV_am=PLD_am;
    
                    }
    
                    lineDataA[selectedLine]["PV"]=PV_am.toFixed(3);
    
                    if (PEB_am<=PLI_am) {
                        PU_am=PEB_am;
    
    
                    } else {
                        PU_am=PLI_am;
    
                    }
    
                    lineDataA[selectedLine]["PU"]=PU_am.toFixed(3);
    
    
                    if (PMS_am>=PSPD_am) {
    
                        PMSL_am=PSPD_am;
    
                    } else {
    
                        PMSL_am=PMS_am
                    }
    
                    lineDataA[selectedLine]["PMS"]=PMSL_am.toFixed(3);
    
                    PM_am=PM_am*(1-PMSL_am);
    
                    if (PSPD_am<=PLD_am) {
                        PW_am=PSPD_am;
    
    
                    } else {
                        PW_am=PLD_am;
    
                    }
    
                    lineDataA[selectedLine]["PW"]=PW_am.toFixed(3);
    
                    if (PSPD_am<=PLI_am) {
                        PZ_am=PSPD_am;
    
    
                    } else {
                        PZ_am=PLI_am;
    
                    }
    
                    lineDataA[selectedLine]["PZ"]=PZ_am.toFixed(3);
                    lineDataA[selectedLine]["PC"]=PSPD_am.toFixed(3);
    
                    PC_am=PC_am*(1-PSPD_am);
    
    
    
                    Ada=(longueur_bat_ext*largeur_bat_ext)+3*2*hauteur_bat_ext*(longueur_bat_ext+largeur_bat_ext)+Math.PI*Math.pow(3*hauteur_bat_ext,2);
                    lineData[selectedLine]["Ada"]=Ada.toFixed(2);
    
                    NDa=Ng*Ada*Cda*Ct*1e-6;
                    lineData[selectedLine]["NDa"]=NDa.toFixed(4);
    
                    Al=(longueur_ligne-3*(hauteur_bat_ext+Ha))*6*hauteur_ligne;
                    
                    NL=Ng*(longueur_ligne-3*(hauteur_bat_ext+Ha))*6*hauteur_ligne*Cdl*Ct*1e-6;
                    
                    
                    Ai=1000*longueur_ligne;
                    lineData[selectedLine]["Ai"]=Ai.toFixed(2);
    
                    Nl=Ng*1000*longueur_ligne*Ce_ligne*Ct*1e-6;
                    lineData[selectedLine]["Nl"]=Nl.toFixed(4);
    
    
                    if (NL<0) {
    
                        NL=0.00;
                        Al=0.00;
                    }
    
                    lineData[selectedLine]["Al"]=Al.toFixed(2);
                    lineData[selectedLine]["NL"]=NL.toFixed(4);
    
    
    
                    var NL_Nl=Nl-NL;
    
                    if (NL_Nl<0) {
    
                        NL_Nl=0.00;
    
                    }
    
                    const ru = parseFloat(zoneData[selectedZone]["FacteurReductionToucherPasValeur"]);
                    const ru_am = parseFloat(zoneDataA[selectedZone]["FacteurReductionToucherPasValeur"]);
    
                    const lt_int = zoneDatafloat[selectedZone]["PertesLtZoneIntValeur"];
                    const lo = zoneDatafloat[selectedZone]["PertesLoZoneValeur"];
                
                    const pa_int = zoneDatafloat[selectedZone]["FacteurPAValeur"];
                    const pa_int_am = zoneDatafloatA[selectedZone]["FacteurPAValeur"];
                   
                    RUS=RUS+(NDa+NL)*ru*pa_int*lt_int*PU;
                    RUS1=RUS1+(NDa+NL)*ru*pa_int*lt_int*PU;
    
                    RUA=RUA+(NDa+NL)*ru_am*pa_int_am*lt_int*PU_am;
                    RUA1=RUA1+(NDa+NL)*ru_am*pa_int_am*lt_int*PU_am;
    
                    RVS=RVS+(NDa+NL)*lf*hz*rf*rp*PV;
                    RVS1=RVS1+(NDa+NL)*lf*hz*rf*rp*PV;
    
                    RVA=RVA+(NDa+NL)*lf*hz*rf*rp_am*PV_am;
                    RVA1=RVA1+(NDa+NL)*lf*hz*rf*rp_am*PV_am;
    
                    RWS=RWS+(NDa+NL)*lo*PW;
                    RWS1=RWS1+(NDa+NL)*lo*PW;
    
                    RWA=RWA+(NDa+NL)*lo*PW_am;
                    RWA1=RWA1+(NDa+NL)*lo*PW_am;
    
                    RZS=RZS+NL_Nl*PZ*lo;
                    RZS1=RZS1+NL_Nl*PZ*lo;
    
                    RZA=RZA+NL_Nl*PZ_am*lo;
                    RZA1=RZA1+NL_Nl*PZ_am*lo;
     
                }
    
    
            }
    
            
    
       
    
            });
    
    
            zoneData[selectedZone]["risqueRUS"]=RUS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRUA"]=RUA1.toExponential(5);
            zoneData[selectedZone]["risqueRVS"]=RVS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRVA"]=RVA1.toExponential(5);
            zoneData[selectedZone]["risqueRWS"]=RWS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRWA"]=RWA1.toExponential(5);
            zoneData[selectedZone]["risqueRZS"]=RZS1.toExponential(5);
            zoneDataA[selectedZone]["risqueRZA"]=RZA1.toExponential(5);
    
            PC=1-PC;
            zoneData[selectedZone]["PC"]=PC.toFixed(5);
            
    
            PC_am=1-PC_am;
            zoneDataA[selectedZone]["PC"]=PC_am.toFixed(5);
    
            PM=1-PM;
            zoneData[selectedZone]["PM"]=PM.toFixed(5);
    
            PM_am=1-PM_am;
            zoneDataA[selectedZone]["PM"]=PM_am.toFixed(5);
    
            Nm=(Am-Ad*Cd)*Ng*1e-6;
    
            if (Nm<=0) {
    
                Nm=0.;
            }
    
            RCS=RCS+Ng*Ad*1e-6*Cd*lo*PC;
            zoneData[selectedZone]["risqueRCS"]=(Ng*Ad*1e-6*Cd*lo*PC).toExponential(5);
    
            RCA=RCA+Ng*Ad*1e-6*Cd*lo*PC_am;
            zoneDataA[selectedZone]["risqueRCA"]=(Ng*Ad*1e-6*Cd*lo*PC_am).toExponential(5);
    
            RMS=RMS+Nm*lo*PM;
            zoneData[selectedZone]["risqueRMS"]=(Nm*Ng*1e-6*lo*PM).toExponential(5);
    
            RMA=RMA+Nm*lo*PM_am;
            zoneDataA[selectedZone]["risqueRMA"]=(Nm*Ng*1e-6*lo*PM_am).toExponential(5);
    
    
    
        
    
            
        }
    


        res.json({RAS,RAA,RBS,RBA,RCS,RCA,RMS,RMA,RUS,RUA,RVS,RVA,RWS,RWA,RZS,RZA,zoneData,zoneDataA,lineData,lineDataA});


    
    });


    app.post('/calcul_AD_structure_complexe', (req, res) => {

    const {rectangles, circles} = req.body;

            // Calculate union area
    //const gridSize = 0.1;

    minX = Math.min(...rectangles.map(r => r.x - r.L / 2 - 3 * r.H), ...circles.map(c => c.x - c.r - 3 * c.H));
    minY = Math.min(...rectangles.map(r => r.y - r.W / 2 - 3 * r.H), ...circles.map(c => c.y - c.r - 3 * c.H));
    maxX = Math.max(...rectangles.map(r => r.x + r.L / 2 + 3 * r.H), ...circles.map(c => c.x + c.r + 3 * c.H));
    maxY = Math.max(...rectangles.map(r => r.y + r.W / 2 + 3 * r.H), ...circles.map(c => c.y + c.r + 3 * c.H));

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const gridSizeX = rangeX / 2000;
    const gridSizeY = rangeY / 2000;


    function pointInRectangle(px, py, rect) {
        const x1 = rect.x - rect.L / 2;
        const x2 = rect.x + rect.L / 2;
        const y1 = rect.y - rect.W / 2;
        const y2 = rect.y + rect.W / 2;
        const r1 = Math.sqrt(Math.pow(px - x1, 2) + Math.pow(py - y1, 2));
        const r2 = Math.sqrt(Math.pow(px - x2, 2) + Math.pow(py - y1, 2));
        const r3 = Math.sqrt(Math.pow(px - x2, 2) + Math.pow(py - y2, 2));
        const r4 = Math.sqrt(Math.pow(px - x1, 2) + Math.pow(py - y2, 2));
        return (px >= rect.x - rect.L / 2 - 3 * rect.H && px <= rect.x + rect.L / 2 + 3 * rect.H &&
                py >= rect.y - rect.W / 2 && py <= rect.y + rect.W / 2) ||
                (px >= rect.x - rect.L / 2 && px <= rect.x + rect.L / 2 &&
                py >= rect.y - rect.W / 2 - 3 * rect.H && py <= rect.y + rect.W / 2 + 3 * rect.H) ||
                (r1 <= 3 * rect.H) ||
                (r2 <= 3 * rect.H) ||
                (r3 <= 3 * rect.H) ||
                (r4 <= 3 * rect.H);
    }

    function pointInCircle(px, py, circle) {
        const dx = px - circle.x;
        const dy = py - circle.y;
        return dx * dx + dy * dy <= (circle.r + 3 * circle.H) * (circle.r + 3 * circle.H);
    }

    let coveredArea = 0;
    for (let x = minX; x <= maxX; x += gridSizeX) {
        for (let y = minY; y <= maxY; y += gridSizeY) {
            let isCovered = rectangles.some(rect => pointInRectangle(x, y, rect)) ||
            circles.some(circle => pointInCircle(x, y, circle));
            if (isCovered) {
                coveredArea += gridSizeX * gridSizeY;
            }
        }
    }

    

    res.json({coveredArea});

    
    

       
    });



    app.post('/calcul_AM_structure_complexe', (req, res) => {

    const {rectangles, circles,Aii} = req.body;

    minX = Math.min(...rectangles.map(r => r.x - r.L / 2 - Aii), ...circles.map(c => c.x - c.r - Aii));
    minY = Math.min(...rectangles.map(r => r.y - r.W / 2 - Aii), ...circles.map(c => c.y - c.r - Aii));
    maxX = Math.max(...rectangles.map(r => r.x + r.L / 2 + Aii), ...circles.map(c => c.x + c.r + Aii));
    maxY = Math.max(...rectangles.map(r => r.y + r.W / 2 + Aii), ...circles.map(c => c.y + c.r + Aii));
    

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const gridSizeX = rangeX / 2000;
    const gridSizeY = rangeY / 2000;

    function pointInRectangle(px, py, rect) {
        const x1 = rect.x - rect.L / 2;
        const x2 = rect.x + rect.L / 2;
        const y1 = rect.y - rect.W / 2;
        const y2 = rect.y + rect.W / 2;
        const r1 = Math.sqrt(Math.pow(px - x1, 2) + Math.pow(py - y1, 2));
        const r2 = Math.sqrt(Math.pow(px - x2, 2) + Math.pow(py - y1, 2));
        const r3 = Math.sqrt(Math.pow(px - x2, 2) + Math.pow(py - y2, 2));
        const r4 = Math.sqrt(Math.pow(px - x1, 2) + Math.pow(py - y2, 2));

        return (px >= rect.x - rect.L / 2 - Aii && px <= rect.x - rect.L / 2 &&
                py >= rect.y - rect.W / 2 && py <= rect.y + rect.W / 2) ||
                (px >= rect.x + rect.L / 2 && px <= rect.x + rect.L / 2 + Aii &&
                py >= rect.y - rect.W / 2 && py <= rect.y + rect.W / 2) ||
                (px >= rect.x - rect.L / 2 && px <= rect.x + rect.L / 2 &&
                py >= rect.y - rect.W / 2 - Aii && py <= rect.y - rect.W / 2) ||
                (px >= rect.x - rect.L / 2 && px <= rect.x + rect.L / 2 &&
                py >= rect.y + rect.W / 2 && py <= rect.y + rect.W / 2 + Aii) ||
                (r1 <= Aii && px >= rect.x - rect.L / 2 - Aii && px <= rect.x - rect.L / 2 && py >= rect.y - rect.W / 2 - Aii && py <= rect.y - rect.W / 2) ||
                (r2 <= Aii && px >= rect.x + rect.L / 2 && px <= rect.x + rect.L / 2 + Aii && py >= rect.y - rect.W / 2 - Aii && py <= rect.y - rect.W / 2) ||
                (r3 <= Aii && px >= rect.x + rect.L / 2 && px <= rect.x + rect.L / 2 + Aii && py >= rect.y + rect.W / 2 && py <= rect.y + rect.W / 2 + Aii) ||
                (r4 <= Aii && px >= rect.x - rect.L / 2 - Aii && px <= rect.x - rect.L / 2 && py >= rect.y + rect.W / 2 && py <= rect.y + rect.W / 2 + Aii);

        
    }

    
    function pointInCircle(px, py, circle) {
        const dx = px - circle.x;
        const dy = py - circle.y;
        return dx * dx + dy * dy <= (circle.r + Aii) * (circle.r + Aii) && 
        dx * dx + dy * dy >= (circle.r) * (circle.r) ;
    }
    
    let coveredArea = 0;
    for (let x = minX; x <= maxX; x += gridSizeX) {
        for (let y = minY; y <= maxY; y += gridSizeY) {
            let isCovered = rectangles.some(rect => pointInRectangle(x, y, rect)) ||
            circles.some(circle => pointInCircle(x, y, circle));
            if (isCovered) {
                coveredArea += gridSizeX * gridSizeY;
            }
        }
    }

    res.json({coveredArea});



    });


    app.post('/calcul_matriciel_separation_distance', (req, res) => {

        const {group_data_cube,group_data_cube_float,linedata,ki} = req.body;

        var A=[];

        for (var i = 0; i < group_data_cube_float.length; i++) {
        A[i] = new Array(group_data_cube_float.length).fill(0);

        }
    
    
        var V = new Array(group_data_cube_float.length).fill(0);
        var T = new Array(group_data_cube_float.length).fill(0);


        

        for (let i = 0; i <group_data_cube_float.length; i++) {

        

            if (group_data_cube[i].prevVisible==='Oui') {
    
                V[i]=ki;
    
            } else {
    
                V[i]=0.0;
    
            }
    
    
            for (let j = 0; j <linedata.length; j++) {
    
                A[i][i]=0.0;
    
                if(((linedata[j].point_depart.pointdepart_x)===group_data_cube_float[i].x0_1) 
                && ((linedata[j].point_depart.pointdepart_y)===group_data_cube_float[i].y0_1) 
                && ((linedata[j].point_depart.pointdepart_z)===group_data_cube_float[i].z0_1)) {
    
                    var index = group_data_cube_float.findIndex(point => point.x0_1 === linedata[j].point_arrivee.pointarrivee_x && point.y0_1 === linedata[j].point_arrivee.pointarrivee_y && point.z0_1 === linedata[j].point_arrivee.pointarrivee_z);
    
                    if (index<=i && index!==-1) {
    
                        continue;
    
                    } else if (index===-1) {
    
                        T[i]=linedata[j].distance;
    
                    } else {
    
                    A[i][index]=linedata[j].distance;
                    A[index][i]=linedata[j].distance;
    
                    }
                
                } else if (((linedata[j].point_arrivee.pointarrivee_x)===group_data_cube_float[i].x0_1) 
                && ((linedata[j].point_arrivee.pointarrivee_y)===group_data_cube_float[i].y0_1) 
                && ((linedata[j].point_arrivee.pointarrivee_z)===group_data_cube_float[i].z0_1)) {  
                    
                    
                    var index = group_data_cube_float.findIndex(point => point.x0_1 === linedata[j].point_depart.pointdepart_x && point.y0_1 === linedata[j].point_depart.pointdepart_y && point.z0_1 === linedata[j].point_depart.pointdepart_z);
    
                    if (index<=i && index!==-1) {
    
                        continue;
    
                    } else if (index===-1) {
    
                        T[i]=linedata[j].distance;
    
    
                    } else {
    
                    A[i][index]=linedata[j].distance;
                    A[index][i]=linedata[j].distance;
    
                    }
    
    
                } 
    
    
    
    
    
    
    
    
    
    
            }
    
    
        }


        res.json({V,A,T});


    });

    app.post('/calcul_As_RGE', (req, res) => {

        const {points_lines} = req.body;

        area = 0.;

        for (let i = 1; i < points_lines.length - 1; i++) {
            const x0 = points_lines[0].x, y0 = points_lines[0].y;
            const x1 = points_lines[i].x, y1 = points_lines[i].y;
            const x2 = points_lines[i + 1].x, y2 = points_lines[i + 1].y;
    
            area += (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
    
    
    
        }

        area=Math.abs(area)/2;

        

        res.json({area});
    


    });


    app.post('/calcul_MATRIX_Z_IMPEDANCE', (req, res) => {

        const {Z,rho,points_e,group_data_cube} = req.body;

        for (let i = 0; i < group_data_cube.length+1; i++) {

            for (let j = 0; j < group_data_cube.length+1; j++) {
    
    
    
                if (i===points_e.length && j!==points_e.length) {
    
                    Z[i][j]=1;
    
                } else if (i===points_e.length && j===points_e.length) {
    
                    Z[i][j]=0;
    
                } else if (j===points_e.length && i!==points_e.length) {
    
                    Z[i][j]=-1;
    
                } else {
    
                    Rij=0.;
    
    
                    for (let k = 0; k < points_e[i].length; k++) {
    
                        if (j===2 && k===9) {
    
                            zz=0;
                        }
    
                        const x0 = points_e[i][k].x0;
                        const y0 = points_e[i][k].y0;
                        const z0 = points_e[i][k].z0;
                        const x1 = points_e[j][0].x1;
                        const y1 = points_e[j][0].y1;
                        const z1 = points_e[j][0].z1;
                        const x2 = points_e[j][0].x2;
                        const y2 = points_e[j][0].y2;
                        const z2 = points_e[j][0].z2;
                        const delta=1/(points_e[i].length);
                        k1=(k+1)*delta
    
                        const a=Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(z2-z1,2);
                        const ap=a;
                        const b=(2*(z1-z0)*(z2-z1)+2*(y1-y0)*(y2-y1)+2*(x1-x0)*(x2-x1));
                        const c=Math.pow(x0-x1,2)+Math.pow(y0-y1,2)+Math.pow(z0-z1,2);
                        const bp=(2*(-z1-z0)*(z1-z2)+2*(y1-y0)*(y2-y1)+2*(x1-x0)*(x2-x1));
                        const cp=Math.pow(x0-x1,2)+Math.pow(y1-y0,2)+Math.pow(z0+z1,2);
    
                        rij=(rho*delta / (4 * Math.PI * Math.sqrt(a))) * (Math.log(Math.abs((2*a+b+2*Math.sqrt(a*(a+b+c)))/(b+2*Math.sqrt(a*c))))+Math.log(Math.abs((2*ap+bp+2*Math.sqrt(ap*(ap+bp+cp)))/(bp+2*Math.sqrt(ap*cp)))));
    
    
                        if (isNaN(rij)) {
    
                        zz=0;
                        }
    
    
                        Rij += (rho*delta / (4 * Math.PI * Math.sqrt(a))) * (Math.log(Math.abs((2*a+b+2*Math.sqrt(a*(a+b+c)))/(b+2*Math.sqrt(a*c))))+Math.log(Math.abs((2*ap+bp+2*Math.sqrt(ap*(ap+bp+cp)))/(bp+2*Math.sqrt(ap*cp)))));
    
                    }
    
                
                Z[i][j]=Rij;
    
    
                    
    
                }
    
    
    
    
    
            }
        }

        

        res.json({Z});
    


    });


    app.post('/programme_principal_modele_electrogeometrique', (req, res) => {

        const {group_data_cube_float,Nombre_points,x0,y0,z0} = req.body;
        
        const result = programme_principal_modele_electrogeometrique_ludique.programme_principal(group_data_cube_float,Nombre_points,x0,y0,z0);

       // console.log(result)
   
       // const pointtest2 = result.pointtest2;
       // const selectedgroup = result.selectedgroup;

       const x_pointtest2 = result.x_pointtest2;
       const y_pointtest2 = result.y_pointtest2;
       const z_pointtest2 = result.z_pointtest2;
       const selectedgroup = result.selectedgroup;

       

        res.json({ x_pointtest2,y_pointtest2,z_pointtest2,selectedgroup });

       

    });



// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
