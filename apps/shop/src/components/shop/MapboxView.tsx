"use client";

import { useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, SealCheck, X, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";
import type { PublicChemistListItemDto } from "@wafrivet/types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type MapboxViewProps = {
  chemists: PublicChemistListItemDto[];
  selectedId?: string | null;
};

export function MapboxView({ chemists, selectedId }: MapboxViewProps) {
  const [popupInfo, setPopupInfo] = useState<PublicChemistListItemDto | null>(null);

  const defaultCenter = useMemo(() => {
    if (chemists.length > 0) {
      return { latitude: chemists[0].lat, longitude: chemists[0].lng };
    }
    return { latitude: 6.4549, longitude: 3.4246 };
  }, [chemists]);

  const [viewState, setViewState] = useState({
    latitude: defaultCenter.latitude,
    longitude: defaultCenter.longitude,
    zoom: 13,
  });

  const pins = useMemo(
    () =>
      chemists.map((chemist) => (
        <Marker
          key={`marker-${chemist.id}`}
          longitude={chemist.lng}
          latitude={chemist.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(chemist);
          }}
        >
          <div className="cursor-pointer group flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white border-4 border-white transition-transform hover:scale-110 ${
                selectedId === chemist.id ? "bg-[#1f3d24]" : "bg-[#2D4D31]"
              }`}
            >
              <MapPin size={20} weight="fill" />
            </div>
          </div>
        </Marker>
      )),
    [chemists, selectedId],
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col items-center justify-center p-8 text-center">
        <WarningCircle size={48} className="text-gray-300 mb-4" />
        <h3 className="text-[18px] font-bold text-gray-900 mb-2">Mapbox Token Missing</h3>
        <p className="text-[14px] text-gray-500 max-w-xs">
          Please add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your environment variables to enable
          the map feature.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[40px] overflow-hidden border border-gray-100 relative bg-gray-100">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        {pins}

        {popupInfo ? (
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
                <button
                  type="button"
                  onClick={() => setPopupInfo(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">{popupInfo.address}</p>
              {popupInfo.isVerified ? (
                <div className="flex items-center gap-1 bg-[#2D4D31]/5 w-fit px-2 py-1 rounded-lg">
                  <SealCheck size={12} weight="fill" className="text-blue-500" />
                  <span className="text-[11px] font-bold text-[#2D4D31]">Verified</span>
                </div>
              ) : null}
              <Link
                href={`/chemists/${popupInfo.id}`}
                className="block w-full mt-3 bg-[#2D4D31] text-white py-2 rounded-xl text-[12px] font-bold hover:bg-[#243f28] transition-colors text-center"
              >
                View Products
              </Link>
            </div>
          </Popup>
        ) : null}
      </Map>

      <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white">
            <MapPin size={22} weight="fill" />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-gray-900">Verified chemists</h4>
            <p className="text-[11px] text-gray-500">
              {chemists.length} chemist{chemists.length === 1 ? "" : "s"} on the map
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            setViewState((state) => ({
              ...state,
              latitude: defaultCenter.latitude,
              longitude: defaultCenter.longitude,
              zoom: 13,
            }))
          }
          className="bg-white px-4 py-2 rounded-xl text-[12px] font-bold border border-gray-100"
        >
          Recenter
        </button>
      </div>
    </div>
  );
}
