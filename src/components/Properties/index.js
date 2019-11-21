import React from "react";
import { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Pin } from "./styles";

const Properties = ({ properties }) =>
  properties.map(property => (
    <Marker
      key={property.id}
      longitude={property.longitude}
      latitude={property.latitude}
    />
  ));

Properties.propTypes = {
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            longitude: PropTypes.number,
            latitude: PropTypes.number
        })
    ).isRequired
};

export default Properties;