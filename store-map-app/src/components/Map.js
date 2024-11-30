import React, {useState, useEffect} from "react";
import { firestore } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'; // Import Firestore methods

const Map = ({ selectedCountry, selectedRegion }) => {
  /*"Create a state variable called stores that starts as an empty array."
  "Also, give me a function called setStores that I can use to update the stores variable." */
  const [stores, setStores] = useState([]);

// use useEffect hook to run fetchStores function 
// to fetch stores data when selectedCountry, selectedRegion changes 

  useEffect(()=>{
    const fetchStores = async () => {
      // Create a reference to the 'stores' collection
      let storesRef = collection(firestore, 'stores');
      
      // Start with a base query
      let q = query(storesRef);

      if (selectedCountry) {
        q = query(q, where('country', '==', selectedCountry), orderBy("cityCode"));
      }
      if (selectedRegion) {
        q = query(q, where('region', '==', selectedRegion));
      }

      const snapshot = await getDocs(q); //save all the result in the snapshot
      //The snapshot object contains metadata and other information
      //we transform the data into a simpler structure that only contains the fields we care about
      //method is an array function : 遍歷 iterating 
      //doc represents each individual document snapshot from the snapshot.docs
      //id: doc.id: This creates a property named id in the new object and assigns it the value of doc.id
      //This uses the spread operator (...) to include all the fields from the document's data.
      const storesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) 
      setStores(storesData); // Call the fetchStores function
    // It is an array of values that the effect depends on. When any of the values in this array change, the effect will be re-executed.
    };
    fetchStores();
  }, [selectedCountry, selectedRegion])

  return (
    <div>
      {stores.length > 0 ? ( // Check if stores array has data
        stores.map(store => (
          <div key={store.id} style={{ marginBottom: '20px' }}>
            <h3 style={{color: '#7b7566'}}>{store.name_chinese}</h3> {/* Display the store name */}
            <iframe
              src={store.googleMapLink} // Use the googleMapLink from Firestore
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${store.name_chinese}`} // Title for accessibility
            ></iframe>
          </div>
        ))
      ) : ( // If no stores available
        <p>No stores available.</p> // Display message if stores array is empty
      )}
    </div>
  );
};

export default Map;
