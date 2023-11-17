import Signup from "./Signup";
import Signin from "./Signin";
import AddCourse from "./AddCourse";

export const routes = [
    { path: "/Signup", element: <Signup/>},
    { path: "/Signin", element: <Signin/>},
    { path: "/addcourse", element: <AddCourse/>}
];