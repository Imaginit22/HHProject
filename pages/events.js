import { useEffect, useState } from 'react';
import Head from '../components/Head';
const events = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 

    //how to make a function. async allows functions that normally
    //run asynchronously to be waited for, using await.

    //code goes here for on-run things
    useEffect(() => {
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly"})
        async function initMap() {
            // Request needed libraries.
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const center = { lat: 43.2556, lng: -79.8711 };
            const map = new Map(document.getElementById("map"), {
              zoom: 12,
              center,
              mapId: "4504f8b37365c3d0"
            });
          
            for (const property of properties) {
              const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
                map,
                content: buildContent(property),
                position: property.position,
                title: property.description,
              });
          
              AdvancedMarkerElement.addListener("click", () => {
                toggleHighlight(AdvancedMarkerElement, property);
              });
            }
          }
          
          function toggleHighlight(markerView, property) {
            if (markerView.content.classList.contains("highlight")) {
              markerView.content.classList.remove("highlight");
              markerView.zIndex = null;
            } else {
              markerView.content.classList.add("highlight");
              markerView.zIndex = 1;
            }
          }
          
          function buildContent(property) {
            const content = document.createElement("div");
          
            content.classList.add("property");
            content.innerHTML = `
              <div class="icon">
                  <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
                  <span class="fa-sr-only">${property.type}</span>
              </div>
              <div class="details">
                  <div class="name">${property.name}</div>
                  <div class="address">${property.address}</div>
              </div>
              `;
            return content;
          }
          
          const properties = [
            {
              address: "ADRESS",
              description: "DESCRIPTION",
              name: "HammyHackz",
              type: "building",
              bed: 4,
              bath: 4,
              size: 800,
              position: {
                lat: 43.2567,
                lng: -79.8911,
              },
            },
            {
              address: "98 Aleh Ave, Palo Alto, CA",
              description: "A lovely store on busy road",
              name: "$ 4,225,000",
              type: "building",
              bed: 2,
              bath: 1,
              size: 210,
              position: {
                lat: 43.2557,
                lng: -79.8711,
              },
            },
            {
              address: "2117 Su St, MountainView, CA",
              description: "Single family house near golf club",
              name: "$ 1,700,000",
              type: "building",
              bed: 4,
              bath: 3,
              size: 200,
              position: {
                lat: 43.255702,
                lng: -79.8711,
              },
            },
            {
              address: "197 Alicia Dr, Santa Clara, CA",
              description: "Multifloor large warehouse",
              name: "$ 5,000,000",
              type: "building",
              bed: 5,
              bath: 4,
              size: 700,
              position: {
                lat: 43.255601,
                lng: -79.8711,
              },
            }
          ];
          
          initMap();
    }, []);

    //html goes here
    return(
        <div>
            <Head title={'about'}/>
            <html>
                <head>
                    <title>Advanced Markers with HTML</title>

                    <script src="https://use.fontawesome.com/releases/v6.2.0/js/all.js"></script>

                    <link rel="stylesheet" type="text/css" href="./styles.css" />
                    <script type="module" src="./GM.js"></script>
                </head>
                <body>
                    <div id="map"></div>
                </body>
            </html>
        </div>
    );
}
export default events