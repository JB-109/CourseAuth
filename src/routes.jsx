import Signup from "./Signup";
import Signin from "./Signin";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Counter from "./Counter";

export const routes = [
    { path: "/Signup", element: <Signup/>},
    { path: "/admin/Courses", element: <Courses/>},
    { path: "/Signin", element: <Signin/>},
    { path: "/admin/addcourse", element: <AddCourse/>},
    { path: "/counter", element: <Counter/>}
];