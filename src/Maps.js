import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import Properties from "./components/Properties";

const TOKEN =
    "pk.eyJ1IjoibHVjYXNzYW50YW5hajEiLCJhIjoiY2szNHUxZjluMTF1bjNtb3EwemlxNXNjZSJ9.CXfaPdgLxZfUGRNLXh1wBg";

class Map extends Component {

    constructor() {
        super();
        this.updatePropertiesLocalization = debounce(
            this.updatePropertiesLocalization,
            500
        );
    }

    componentDidMount() {
        this.loadProperties();
    }

    updatePropertiesLocalization() {
        this.loadProperties();
    }

    loadProperties = async () => {
        const { latitude, longitude } = this.state.viewport;
    };

    static propTypes = {
        containerWidth: PropTypes.number.isRequired,
        containerHeight: PropTypes.number.isRequired
    };

    state = {
        viewport: {
            latitude: -15.733555199999998,
            longitude: -47.8961664,
            zoom: 17,
            bearing: 0,
            pitch: 0
        },

        properties: []
    };

    render() {
        const { containerWidth: width, containerHeight: height } = this.props;

        return (
            <MapGL
                width={width}
                height={height}
                {... this.state.viewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={TOKEN}
                onViewportChange={viewport => this.setState({ viewport })}
                onViewStateChange={this.updatePropertiesLocalization.bind(this)}
            >
                <Properties properties={properties} />
            </MapGL>
        );
    }
}

const DimensionedMap = Dimensions()(Map);
const App = () => (
    <Container>
        <DimensionedMap />
    </Container>
);


export default App;