using System;

namespace API.ExtensionMethods
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var possibleAge = dateOfBirth.Year - today.Year;
            if (dateOfBirth.Date > today.AddYears(-possibleAge)) possibleAge--;

            return possibleAge;
        }
    }
}
