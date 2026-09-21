module tb_adder;
    reg [3:0] a;
    reg [3:0] b;
    wire [4:0] sum;

    // Instantiate the adder module
    adder uut (
        .a(a),
        .b(b),
        .sum(sum)
    );

    initial begin
        // Instructs iverilog to create output.vcd
        $dumpfile("output.vcd");
        $dumpvars(0, tb_adder);

        // Apply test inputs
        a = 4'b0011; b = 4'b0101; #10;
        a = 4'b1111; b = 4'b0001; #10;

        $finish;
    end
endmodule
