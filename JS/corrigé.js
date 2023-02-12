/*
Réaliser un groupBy

Reduce peut aussi nous permettre d'effectuer des manipulations comme des groupBy sur un tableau (bon avec l'aide de petits helpers).

Prenons comme point de départ cette liste de stat représentant un découpage par site et par famille de navigateurs. Nous aimerions pouvoir grouper les résultats par site :

Array(3) [ (3) […], (2) […], (2) […] ]

Array [
        [
            {site: "google", etc},
            {site: "google", etc},
            {site: "google", etc}
        ]
        [
            {site: "mozzilla", etc},
            {site: "mozzilla", etc},
            {site: "mozzilla", etc}
        ]
         [
            {site: "microsoft", etc},
            {site: "microsoft", etc}
        ]

    ]
    

*/

var stats = [
  { site: "google.fr", browser: "Chrome", value: "50%" },
  { site: "google.fr", browser: "FireFox", value: "30%" },
  { site: "google.fr", browser: "Internet Explorer", value: "20%" },
  { site: "mozilla.fr", browser: "FireFox", value: "60%" },
  { site: "mozilla.fr", browser: "Internet Explorer", value: "20%" },
  { site: "microsoft.fr", browser: "Chrome", value: "10%" },
  { site: "microsoft.fr", browser: "FireFox", value: "20%" },
];

function compareSite(NomDuSite, currentValue) {
  //Compare le nomduSite et le nom du site de la currentValue et retourne vrai si il y est
  return NomDuSite === currentValue.site;
}

function containSite(nomDuSite, currentValue) {
  //Est-ce qu'il y a un dans currentValue un une value qui correspond à nomDuSite
  return currentValue.some(compareSite.bind(null, nomDuSite)); //Indique s'il y a au moins un retour true dans compareSite
}

function makeNewTab(accumulator, currentValue) {
  var site = accumulator.filter(containSite.bind(null, currentValue.site)); //on bind pour pouvoir recevoir currentValue dans containSite alors qu'on passe currentValue.site et non currentValue
  //accumulator accumule les valeurs qui remplissent la condition de accumulator.filter(containSite) au fil des itérations.
  //Il sert à construire un nouveau tableau à partir de l'ancien, donc après la première iteration, on a juste le premier object dans accumulator et donc dans site
  //site est une valeur qui contient le résultat de accumulator.filter(containSite)
  //Si containSite ne retourne rien, alors il n'y a rien dans l'accumulateur et donc rien dans la var site.
  //Et donc site.length===0 (ne contient rien)
  //donc ça veut dire qu'on a changé de nom de site et qu'il faut créer un nouveau tableau
  //donc le prochain currentValue est l'objet 5
  //...
  console.log(site.length);  //.length est une valeur non indextuelle donc s'il y a un element dans site , alors site.length = 1
  if (site.length > 0) { //site contient ce que l'accumulator a filtré à chaque itération[et non pas l'accumulateur lui même!!!!!] donc si accumulator ne filtre rien
                        //alors site ne contient rien, donc on push un nouveau tab et 
                           // on met la current value dedans, et 
    //donc s'il y a plus qu'un object dans le site
    site[0].push(currentValue);
  } else {
    accumulator.push([currentValue]);
  }
  return accumulator; //finalement on return l'accumulator qui représente tableau2Tableau2objet
}

var tableau2Tableau2objet = stats.reduce(makeNewTab, []); //ne pas oublier d'indiquer qu'on push dans un nouveau tableau

console.log(tableau2Tableau2objet);
