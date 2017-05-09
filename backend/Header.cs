using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public class Header
    {
        public Header()
        {
            this.rows = new List<Rows>();
        }
        public string tidpunkt;
        public string ordernummer;
        public string kund;
        public List<Rows> rows;

    }

    public class Rows
    {
        public string ordernummer;
        public string artikel;
        public string antal;
        public string styckpris;
    }
}
