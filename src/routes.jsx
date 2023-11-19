import Signup from "./Signup";
import Signin from "./Signin";
import AddCourse from "./AddCourse";
import Courses from "./Courses";

export const routes = [
    { path: "/Signup", element: <Signup/>},
    { path: "/Courses", element: <Courses/>},
    { path: "/Signin", element: <Signin/>},
    { path: "/addcourse", element: <AddCourse/>}
];