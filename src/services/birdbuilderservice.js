
import witai from './witai.js';
import mapmanger from './mapmanager.js';
import moment from 'moment';


const homeLat = 41.498935;
const homeLng = -81.571083;

let templateBirdObject = {
    momname           : "",
    url               : "",
    imageurl          : "",
    thumburl          : "",
    location          : "",
    lat               : homeLat,
    lng               : homeLng,
    sightingdate      : "",
    sightingdatearray : ""
};

let bird = {};

function mapWitAiExtractToBird(extract) {
  let dummyextract = {
    "text": "Mom saw a black bird in bethany west virginia on august 3rd 1935",
    "confidence": 1,
    "sightingDate": {
        "start": 46,
        "end": 64,
        "body": "on august 3rd 1935",
        "confidence": 0.973,
        "grain": "day",
        "value": "1935-08-03T00:00:00.000-08:00"
    },
    "location": {
        "start": 24,
        "end": 45,
        "body": "bethany west virginia",
        "confidence": 0.9443,
        "value": "bethany west virginia"
    },
    "bird": {
        "role": "bird",
        "start": 10,
        "end": 20,
        "body": "black bird",
        "confidence": 0.5184,
        "value": "black bird",
    }
  }
  bird.momname = extract.bird.body;
  bird.address = extract.location.body;
  bird.sightingdate = moment(extract.sightingDate.value).format('YYYY/MM/DD');
  bird.sightingdatearray = bird.sightingdate.split('/');
}

function getLocationInformationFromReverseGeocodedData(geoData) {
  if (geoData && geoData.features) {
    let features = geoData.features;

    let geoDataFeature = features.find((feature) => {
      if (feature.place_type && feature.place_type == "place") {
        bird.lng = feature.center[0];
        bird.lat = feature.center[1];
        return true;
      }
      return false;
    })
    return geoDataFeature;
  }
}

function getBirdUrl() {
  let wikiName = bird.momname.replace(/[^a-zA-Z0-9 ]/g,"").replace(/[ ]/g,"_");
  bird.url = `https://en.wikipedia.org/wiki/${wikiName}`;
}


function  buildBirdObject(utterance, birdBuilt, utteranceInvalid) {
    witai.interpretBirdInfo(utterance)
      .then(extract => {
          console.log(JSON.stringify(extract,null,4)); 
          if (witai.isExtractValid(extract)) {
            bird = { ...templateBirdObject, utterance: utterance };
            mapWitAiExtractToBird(extract);
            getBirdUrl();
            //getWikiData().then(()=>{birdBuilt(bird)})
            birdBuilt(bird);
            // mapmanger.reverseGeoCode(bird.address)
            //   .then(geoData => {
            //     getLocationInformationFromReverseGeocodedData(geoData);
            //     getBirdUrl();
            //     //getWikiData().then(()=>{birdBuilt(bird)})
            //     bird.utterance = utterance;
            //     birdBuilt(bird);
            //   })
          } else {
            utteranceInvalid(utterance)
          }
      })
  }

  export default {
    buildBirdObject: buildBirdObject
  }