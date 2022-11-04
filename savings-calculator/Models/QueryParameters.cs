using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace savings_calculator
{
    public class QueryParameters
    {
        [BindRequired]
        public float CustomerRate { get; set; }
        [BindRequired]
        public int BorrowingAmount { get; set; }
    }
}
