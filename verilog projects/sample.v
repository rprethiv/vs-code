module adder(
    input  [3:0] a,    // 4-bit input a
    input  [3:0] b,    // 4-bit input b
    output [4:0] sum   // 5-bit sum (to handle carry)
);

    assign sum = a + b; // combinational addition

endmodule
