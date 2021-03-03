import rTabs from "utils/rTabs";
const examples = {
    7: rTabs(`
    // Write your C++ code here
    #include <iostream>
    int main() {
        std::cout << "Hello World!";
        return 0;
    }
    `),
    13: rTabs(`
    // Write Go code here.
    package main
    import "fmt"
    func main() {
        fmt.Println("hello world")
    }
    `),
    19: rTabs(`
    // Write JavaScript code here.
    console.log("Hello world");
    `),
    37: rTabs(`
    # Write Python 3 code here.
    print("Hello world")
    `),
}

export default examples;