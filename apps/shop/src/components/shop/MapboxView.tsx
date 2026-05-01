"use client";

import { useState, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Star, X } from "@phosphor-icons/react";

// Mock Data for Chemists
const CHEMISTS = [
  { id: 1, name: "Health First Agro", lat: 6.4549, lng: 3.4246, rating: 4.8, address: "12 Marina Road, Lagos Island" },
  { id: 2, name: "Lagos Vet Hub", lat: 6.4485, lng: 3.4180, rating: 4.9, address: "5 Broad Street, Lagos" },
  { id: 3, name: "FarmSafe Pharma", lat: 6.4620, lng: 3.4350, rating: 4.5, address: "8 Ikoyi Way, Lagos" },
];

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Use environment variable for security

export function MapboxView() {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [viewState, setViewState] = useState({
    latitude: 6.4549,
    longitude: 3.4246,
    zoom: 13
  });

  const pins = useMemo(
    () =>
      CHEMISTS.map((chemist) => (
        <Marker
          key={`marker-${chemist.id}`}
          longitude={chemist.lng}
          latitude={chemist.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(chemist);
          }}
        >
          <div className="cursor-pointer group flex flex-col items-center">
             <div className="bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-100 text-[10px] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {chemist.name}
             </div>
             <div className="w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-xl transition-transform hover:scale-110">
                <MapPin size={20} weight="fill" />
             </div>
          </div>
        </Marker>
      )),
    []
  );

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            className="rounded-3xl"
          >
            <div className="p-3 max-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="font-bold text-[14px] text-gray-900">{popupInfo.name}</h3>
                 <button onClick={() => setPopupInfo(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={14} weight="bold" />
                 </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">{popupInfo.address}</p>
              <div className="flex items-center gap-1 bg-[#2D4D31]/5 w-fit px-2 py-1 rounded-lg">
                <Star size={12} weight="fill" className="text-yellow-400" />
                <span className="text-[11px] font-bold text-[#2D4D31]">{popupInfo.rating}</span>
              </div>
              <button className="w-full mt-3 bg-[#2D4D31] text-white py-2 rounded-xl text-[12px] font-bold hover:bg-[#243f28] transition-colors">
                View Products
              </button>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Info Card */}
      <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white">
               <MapPin size={22} weight="fill" />
            </div>
            <div>
               <h4 className="text-[13px] font-bold text-gray-900">Lagos Island</h4>
               <p className="text-[11px] text-gray-500">12 chemists verified in this area</p>
            </div>
         </div>
         <button className="bg-white px-4 py-2 rounded-xl text-[12px] font-bold border border-gray-100 shadow-sm">
            Recenter
         </button>
      </div>
    </div>
  );
}
