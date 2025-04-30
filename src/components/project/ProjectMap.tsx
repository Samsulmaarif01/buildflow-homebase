
import React from "react";
import { Location } from "@/types";
import { MapPin } from "lucide-react";

type ProjectMapProps = {
  location: Location;
};

const ProjectMap: React.FC<ProjectMapProps> = ({ location }) => {
  //  this would integrate with Google Maps API
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-muted h-60">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <MapPin className="h-8 w-8 text-primary mb-2" />
        <p className="text-sm font-medium">{location.address}</p>
        <p className="text-xs text-muted-foreground">
          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </p>
      </div>
    </div>
  );
};

export default ProjectMap;
