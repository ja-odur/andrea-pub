import rTabs from "utils/rTabs";
const examples = {
    7: rTabs(`
    // Write your C++ code here
    #include <iostream>
    int main() {
        std::cout << "hello from andrea!";
        return 0;
    }
    `),
    13: rTabs(`
    // Write Go code here.
    package main
    import "fmt"
    func main() {
        fmt.Println("hello from andrea!")
    }
    `),
    19: rTabs(`
    // Write JavaScript code here.
    console.log("hello from andrea!");
    `),
    37: rTabs(`
    # Write Python code here.
    print("hello from andrea!")
    `),
}

export default examples;
