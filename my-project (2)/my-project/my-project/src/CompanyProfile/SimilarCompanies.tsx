import { similar } from "../Data/Company";
import CompanyCard from "./CompanyCard";

const SimilarCompanies=()=>{
    return <div className="w-full xl:w-1/4">
        <div className="text-xl font-semibold mb-5">Similar Companies</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
            {
                similar.map((companies,index)=><CompanyCard key={index} {...companies}/>)
            }
        </div>
    </div>
}
export default SimilarCompanies;