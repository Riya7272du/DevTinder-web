import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests=()=>{
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            console.log(res.data.data);
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);
    if (!requests) return null;

    if (requests.length === 0) return <h1>No Requests Found</h1>;

    return (
        <div className="text-center my-10 pb-20"> {/* Added padding-bottom */}
            <h1 className="font-bold text-white text-3xl mb-5">Requests</h1>
            {requests.map((request) => {
                const {_id,firstName, lastName, photoUrl, skills, about, age, gender } = request.fromUserId;
                return (
                    <div
                        key={_id}
                        className="flex justify-betweenitem-center m-4 p-4 rounded-lg bg-base-300 max-w-3xl mx-auto mb-5 w-full"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-7 flex-grow">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                          <button className="btn btn-primary my-2">Reject</button>
                          <button className="btn btn-secondary my-2">Accept</button>
                      </div>
                    </div>
                );
            })}
        </div>
    );
}
export default Requests