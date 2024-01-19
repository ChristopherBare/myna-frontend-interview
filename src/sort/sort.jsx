const Sort = ({onChange}) => {
    return (
        <div className="form-control">
            <label className="cursor-pointer label flex justify-start gap-4">
                <input type="radio"
                       name="sort"
                       className="checkbox checkbox-success" value="DESC"
                       checked
                       onChange={onChange}/>
                <span className="label-text">High to Low</span>
            </label>
            <label className="cursor-pointer label flex justify-start gap-4">
                <input type="radio"
                       name="sort"
                       className="checkbox checkbox-success"
                       value="DESC"
                       onChange={onChange}/>
                <span className="label-text">Low to High</span>
            </label>
        </div>
    )
}
export default Sort;