using System;

namespace savings_calculator
{
    public class PostPayload
    {
        public PostPayload(float rate, int borrowAmount)
        {
            Rate = rate;
            BorrowingAmount = borrowAmount;
        }

        public string Merchant => "TIC";
        public string Lender => "BEN";
        public float Rate { get; }
        public string RateType => "VAR";
        public string RepaymentType => "PI";
        public string PropertyUsage => "INV";
        public float CustomerRate { get; set; }
        public int LoanTerm => 20;
        public int BorrowingAmount { get; set; }
        public int? RateTerm => null;
    }
}
