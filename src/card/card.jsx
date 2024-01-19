const Card = (data) => {
    return (
        <div className="card card-compact w-75 bg-base-100 shadow-xl">
            <figure><img src={`https://cdn.myna.co/${data.data.images[0].imageURL}`} alt="Shoes"/>
            </figure>
            <div className="card-body text-start flex flex-1 flex-col justify-between">
                <h2 className="card-title">{data.data.name}</h2>
                <div>
                    <p><small>Price</small></p>
                    <h2>{`$${convertToUSD(data.data.retailPrice)}`}</h2>
                </div>
            </div>
        </div>
    )
}

function convertToUSD(value) {
    const scale = Math.pow(10, 6);
    return value / scale;
}

export default Card;