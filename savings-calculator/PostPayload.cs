using System;

namespace savings_calculator
{
    public class PostPayload
    {
        public PostPayload(double rate, int borrowAmount)
        {
            Rate = rate;
            BorrowingAmount = borrowAmount;
        }

        public string Merchant => "TIC";
        public string Lender => "BEN";
        public double Rate { get; }
        public string RateType => "VAR";
        public string RepaymentType => "PI";
        public string PropertyUsage => "INV";
        public double CustomerRate { get; set; }
        public int LoanTerm => 20;
        public int BorrowingAmount { get; }
        public int? RateTerm => null;
    }
}
