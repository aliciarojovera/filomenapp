import MapRender from "../../Components/MapRender/MapRender";

const Map = () => {
    return (
        <>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOnwxnYhEZelHf48LdDjmG4QsAyzCnGCc&libraries=places"></script>
            <MapRender/>
        </>
    );
}
 
export default Map;