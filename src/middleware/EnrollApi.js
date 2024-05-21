// middleware.js
import { enrollRequest, enrollSuccess, enrollFailure } from '../actions/EnrollAction';

export function enrollMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        next(action);

        if (action.type === enrollRequest().type) {
            const { courseId } = action;
            const enrollmentEndpoint = "http://localhost:5199/lxp/enroll";
            const request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId: courseId,
                    learnerId: "c310d0c7-e3bf-43af-aebd-3abcfd7f167f",
                    enrollmentDate: new Date().toISOString(),
                    enrollStatus: true,
                    enrollRequestStatus: true,
                }),
            };

            fetch(enrollmentEndpoint, request)
                .then((response) => {
                    
                    if (response.ok) {
                        dispatch(enrollSuccess(courseId));
                    } else {
                        throw new Error("Enrollment failed. Please try again later.");
                    }
                    return response.json();
                })
                .catch((error) => {
                    dispatch(enrollFailure(error));
                });
        }
    };
}
