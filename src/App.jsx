import './App.css'
import useAPI from "./hooks/useAPI.js";
import Card from "./card/card.jsx";
import Search from "./search/search.jsx";
import Sort from "./sort/sort.jsx";
import {useState} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useState('jordan')
    const [sortOrder, setSortOrder] = useState('DESC')
    const apiUrl = 'https://staging-api.myna.co/api/graphql'
    const query =
        'query Search_Query(  $search: String  $brands: [UUID!]  $groupings: [UUID!]  $properties: [PropertyValue!]  $discoverability: [AssetDiscoverability!]  $first: Int  $orderBy: AssetOrder!) {  assets(first: $first, orderBy: $orderBy, where: {search: $search, brandIDIn: $brands, groupingIDIn: $groupings, propertyValueIn: $properties, discoverability: $discoverability}) {    edges {      node {        __typename        id        name        sku        retailPrice        images {          assetImageOrderIndex          imageURL          id        }      }      cursor    }    totalCount    pageInfo {      startCursor      endCursor      hasNextPage      hasPreviousPage    }  }}';
    const vars = {  "search": searchTerm,  "discoverability": [    "discoverable"  ], "orderBy": {    "direction": sortOrder,    "field": "RETAIL_PRICE"  },  "first": 10}
    const body = {query: query, variables: vars}
    const {data, isLoading, error} = useAPI(apiUrl, body)


    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handleSearch = (term) => {
        setSearchTerm(term)
        console.info("term changed to ", term)
    }
    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-start-2 col-end-7">
                <h1 className="text-start">Found {isLoading ? ("0")
                    : (`${data?.data?.assets?.edges.length}`)} results for {`"${searchTerm}"`}</h1>
            </div>
            <div className="col-start-1 col-span-1">
                <Search onSearch={handleSearch}/>
                <Sort onChange={handleSortChange}/>
            </div>
            <div className="col-start-2 col-end-7">
            {isLoading ? (
                <p><span className="loading loading-ring loading-lg"></span></p>
            ) : error ? (
                <p style={{color: 'red'}}>Error: {error.message}</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {data?.data?.assets?.edges.map((node) => (
                        <Card
                            data={node.node}
                        />
                    ))}
                </div>
            )}</div>
        </div>
    )
}



export default App
