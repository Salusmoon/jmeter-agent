/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 150.0, "minX": 0.0, "maxY": 1070.0, "series": [{"data": [[0.0, 150.0], [0.1, 150.0], [0.2, 150.0], [0.3, 150.0], [0.4, 150.0], [0.5, 153.0], [0.6, 153.0], [0.7, 153.0], [0.8, 153.0], [0.9, 153.0], [1.0, 158.0], [1.1, 158.0], [1.2, 158.0], [1.3, 158.0], [1.4, 158.0], [1.5, 159.0], [1.6, 159.0], [1.7, 159.0], [1.8, 159.0], [1.9, 160.0], [2.0, 160.0], [2.1, 160.0], [2.2, 160.0], [2.3, 160.0], [2.4, 160.0], [2.5, 160.0], [2.6, 160.0], [2.7, 160.0], [2.8, 160.0], [2.9, 160.0], [3.0, 160.0], [3.1, 160.0], [3.2, 160.0], [3.3, 160.0], [3.4, 160.0], [3.5, 160.0], [3.6, 160.0], [3.7, 160.0], [3.8, 164.0], [3.9, 164.0], [4.0, 164.0], [4.1, 164.0], [4.2, 164.0], [4.3, 168.0], [4.4, 168.0], [4.5, 168.0], [4.6, 168.0], [4.7, 168.0], [4.8, 168.0], [4.9, 168.0], [5.0, 168.0], [5.1, 168.0], [5.2, 168.0], [5.3, 168.0], [5.4, 168.0], [5.5, 168.0], [5.6, 168.0], [5.7, 169.0], [5.8, 169.0], [5.9, 169.0], [6.0, 169.0], [6.1, 170.0], [6.2, 170.0], [6.3, 170.0], [6.4, 170.0], [6.5, 170.0], [6.6, 170.0], [6.7, 170.0], [6.8, 170.0], [6.9, 170.0], [7.0, 170.0], [7.1, 171.0], [7.2, 171.0], [7.3, 171.0], [7.4, 171.0], [7.5, 171.0], [7.6, 171.0], [7.7, 171.0], [7.8, 171.0], [7.9, 171.0], [8.0, 171.0], [8.1, 171.0], [8.2, 171.0], [8.3, 171.0], [8.4, 171.0], [8.5, 171.0], [8.6, 171.0], [8.7, 171.0], [8.8, 171.0], [8.9, 172.0], [9.0, 172.0], [9.1, 172.0], [9.2, 172.0], [9.3, 172.0], [9.4, 172.0], [9.5, 172.0], [9.6, 172.0], [9.7, 172.0], [9.8, 172.0], [9.9, 173.0], [10.0, 173.0], [10.1, 173.0], [10.2, 173.0], [10.3, 175.0], [10.4, 175.0], [10.5, 175.0], [10.6, 175.0], [10.7, 175.0], [10.8, 175.0], [10.9, 175.0], [11.0, 175.0], [11.1, 175.0], [11.2, 175.0], [11.3, 175.0], [11.4, 175.0], [11.5, 175.0], [11.6, 175.0], [11.7, 176.0], [11.8, 176.0], [11.9, 176.0], [12.0, 176.0], [12.1, 176.0], [12.2, 179.0], [12.3, 179.0], [12.4, 179.0], [12.5, 179.0], [12.6, 179.0], [12.7, 179.0], [12.8, 179.0], [12.9, 179.0], [13.0, 179.0], [13.1, 180.0], [13.2, 180.0], [13.3, 180.0], [13.4, 180.0], [13.5, 180.0], [13.6, 180.0], [13.7, 180.0], [13.8, 180.0], [13.9, 180.0], [14.0, 180.0], [14.1, 183.0], [14.2, 183.0], [14.3, 183.0], [14.4, 183.0], [14.5, 184.0], [14.6, 184.0], [14.7, 184.0], [14.8, 184.0], [14.9, 184.0], [15.0, 185.0], [15.1, 185.0], [15.2, 185.0], [15.3, 185.0], [15.4, 185.0], [15.5, 187.0], [15.6, 187.0], [15.7, 187.0], [15.8, 187.0], [15.9, 191.0], [16.0, 191.0], [16.1, 191.0], [16.2, 191.0], [16.3, 191.0], [16.4, 196.0], [16.5, 196.0], [16.6, 196.0], [16.7, 196.0], [16.8, 196.0], [16.9, 196.0], [17.0, 196.0], [17.1, 196.0], [17.2, 196.0], [17.3, 196.0], [17.4, 196.0], [17.5, 196.0], [17.6, 196.0], [17.7, 196.0], [17.8, 198.0], [17.9, 198.0], [18.0, 198.0], [18.1, 198.0], [18.2, 198.0], [18.3, 199.0], [18.4, 199.0], [18.5, 199.0], [18.6, 199.0], [18.7, 200.0], [18.8, 200.0], [18.9, 200.0], [19.0, 200.0], [19.1, 200.0], [19.2, 200.0], [19.3, 200.0], [19.4, 200.0], [19.5, 200.0], [19.6, 200.0], [19.7, 200.0], [19.8, 200.0], [19.9, 200.0], [20.0, 200.0], [20.1, 202.0], [20.2, 202.0], [20.3, 202.0], [20.4, 202.0], [20.5, 202.0], [20.6, 203.0], [20.7, 203.0], [20.8, 203.0], [20.9, 203.0], [21.0, 203.0], [21.1, 205.0], [21.2, 205.0], [21.3, 205.0], [21.4, 205.0], [21.5, 206.0], [21.6, 206.0], [21.7, 206.0], [21.8, 206.0], [21.9, 206.0], [22.0, 207.0], [22.1, 207.0], [22.2, 207.0], [22.3, 207.0], [22.4, 207.0], [22.5, 207.0], [22.6, 207.0], [22.7, 207.0], [22.8, 207.0], [22.9, 208.0], [23.0, 208.0], [23.1, 208.0], [23.2, 208.0], [23.3, 208.0], [23.4, 210.0], [23.5, 210.0], [23.6, 210.0], [23.7, 210.0], [23.8, 210.0], [23.9, 210.0], [24.0, 210.0], [24.1, 210.0], [24.2, 210.0], [24.3, 210.0], [24.4, 210.0], [24.5, 210.0], [24.6, 210.0], [24.7, 210.0], [24.8, 212.0], [24.9, 212.0], [25.0, 212.0], [25.1, 212.0], [25.2, 212.0], [25.3, 213.0], [25.4, 213.0], [25.5, 213.0], [25.6, 213.0], [25.7, 213.0], [25.8, 214.0], [25.9, 214.0], [26.0, 214.0], [26.1, 214.0], [26.2, 214.0], [26.3, 214.0], [26.4, 214.0], [26.5, 214.0], [26.6, 214.0], [26.7, 215.0], [26.8, 215.0], [26.9, 215.0], [27.0, 215.0], [27.1, 215.0], [27.2, 216.0], [27.3, 216.0], [27.4, 216.0], [27.5, 216.0], [27.6, 217.0], [27.7, 217.0], [27.8, 217.0], [27.9, 217.0], [28.0, 217.0], [28.1, 217.0], [28.2, 217.0], [28.3, 217.0], [28.4, 217.0], [28.5, 217.0], [28.6, 218.0], [28.7, 218.0], [28.8, 218.0], [28.9, 218.0], [29.0, 218.0], [29.1, 218.0], [29.2, 218.0], [29.3, 218.0], [29.4, 218.0], [29.5, 219.0], [29.6, 219.0], [29.7, 219.0], [29.8, 219.0], [29.9, 219.0], [30.0, 222.0], [30.1, 222.0], [30.2, 222.0], [30.3, 222.0], [30.4, 223.0], [30.5, 223.0], [30.6, 223.0], [30.7, 223.0], [30.8, 223.0], [30.9, 223.0], [31.0, 223.0], [31.1, 223.0], [31.2, 223.0], [31.3, 223.0], [31.4, 223.0], [31.5, 223.0], [31.6, 223.0], [31.7, 223.0], [31.8, 225.0], [31.9, 225.0], [32.0, 225.0], [32.1, 225.0], [32.2, 225.0], [32.3, 226.0], [32.4, 226.0], [32.5, 226.0], [32.6, 226.0], [32.7, 226.0], [32.8, 226.0], [32.9, 226.0], [33.0, 226.0], [33.1, 226.0], [33.2, 227.0], [33.3, 227.0], [33.4, 227.0], [33.5, 227.0], [33.6, 227.0], [33.7, 229.0], [33.8, 229.0], [33.9, 229.0], [34.0, 229.0], [34.1, 229.0], [34.2, 229.0], [34.3, 229.0], [34.4, 229.0], [34.5, 229.0], [34.6, 230.0], [34.7, 230.0], [34.8, 230.0], [34.9, 230.0], [35.0, 230.0], [35.1, 230.0], [35.2, 230.0], [35.3, 230.0], [35.4, 230.0], [35.5, 230.0], [35.6, 230.0], [35.7, 230.0], [35.8, 230.0], [35.9, 230.0], [36.0, 231.0], [36.1, 231.0], [36.2, 231.0], [36.3, 231.0], [36.4, 231.0], [36.5, 232.0], [36.6, 232.0], [36.7, 232.0], [36.8, 232.0], [36.9, 232.0], [37.0, 232.0], [37.1, 232.0], [37.2, 232.0], [37.3, 232.0], [37.4, 232.0], [37.5, 232.0], [37.6, 232.0], [37.7, 232.0], [37.8, 232.0], [37.9, 233.0], [38.0, 233.0], [38.1, 233.0], [38.2, 233.0], [38.3, 233.0], [38.4, 233.0], [38.5, 233.0], [38.6, 233.0], [38.7, 233.0], [38.8, 234.0], [38.9, 234.0], [39.0, 234.0], [39.1, 234.0], [39.2, 234.0], [39.3, 234.0], [39.4, 234.0], [39.5, 234.0], [39.6, 234.0], [39.7, 234.0], [39.8, 235.0], [39.9, 235.0], [40.0, 235.0], [40.1, 235.0], [40.2, 238.0], [40.3, 238.0], [40.4, 238.0], [40.5, 238.0], [40.6, 238.0], [40.7, 238.0], [40.8, 238.0], [40.9, 238.0], [41.0, 238.0], [41.1, 238.0], [41.2, 238.0], [41.3, 238.0], [41.4, 238.0], [41.5, 238.0], [41.6, 239.0], [41.7, 239.0], [41.8, 239.0], [41.9, 239.0], [42.0, 239.0], [42.1, 240.0], [42.2, 240.0], [42.3, 240.0], [42.4, 240.0], [42.5, 240.0], [42.6, 240.0], [42.7, 240.0], [42.8, 240.0], [42.9, 240.0], [43.0, 241.0], [43.1, 241.0], [43.2, 241.0], [43.3, 241.0], [43.4, 241.0], [43.5, 242.0], [43.6, 242.0], [43.7, 242.0], [43.8, 242.0], [43.9, 242.0], [44.0, 242.0], [44.1, 242.0], [44.2, 242.0], [44.3, 242.0], [44.4, 245.0], [44.5, 245.0], [44.6, 245.0], [44.7, 245.0], [44.8, 245.0], [44.9, 246.0], [45.0, 246.0], [45.1, 246.0], [45.2, 246.0], [45.3, 246.0], [45.4, 247.0], [45.5, 247.0], [45.6, 247.0], [45.7, 247.0], [45.8, 247.0], [45.9, 247.0], [46.0, 247.0], [46.1, 247.0], [46.2, 247.0], [46.3, 247.0], [46.4, 247.0], [46.5, 247.0], [46.6, 247.0], [46.7, 247.0], [46.8, 247.0], [46.9, 247.0], [47.0, 247.0], [47.1, 247.0], [47.2, 248.0], [47.3, 248.0], [47.4, 248.0], [47.5, 248.0], [47.6, 248.0], [47.7, 248.0], [47.8, 248.0], [47.9, 248.0], [48.0, 248.0], [48.1, 248.0], [48.2, 248.0], [48.3, 248.0], [48.4, 248.0], [48.5, 248.0], [48.6, 249.0], [48.7, 249.0], [48.8, 249.0], [48.9, 249.0], [49.0, 249.0], [49.1, 250.0], [49.2, 250.0], [49.3, 250.0], [49.4, 250.0], [49.5, 250.0], [49.6, 251.0], [49.7, 251.0], [49.8, 251.0], [49.9, 251.0], [50.0, 253.0], [50.1, 253.0], [50.2, 253.0], [50.3, 253.0], [50.4, 253.0], [50.5, 253.0], [50.6, 253.0], [50.7, 253.0], [50.8, 253.0], [50.9, 253.0], [51.0, 254.0], [51.1, 254.0], [51.2, 254.0], [51.3, 254.0], [51.4, 254.0], [51.5, 254.0], [51.6, 254.0], [51.7, 254.0], [51.8, 254.0], [51.9, 257.0], [52.0, 257.0], [52.1, 257.0], [52.2, 257.0], [52.3, 257.0], [52.4, 258.0], [52.5, 258.0], [52.6, 258.0], [52.7, 258.0], [52.8, 258.0], [52.9, 259.0], [53.0, 259.0], [53.1, 259.0], [53.2, 259.0], [53.3, 260.0], [53.4, 260.0], [53.5, 260.0], [53.6, 260.0], [53.7, 260.0], [53.8, 261.0], [53.9, 261.0], [54.0, 261.0], [54.1, 261.0], [54.2, 261.0], [54.3, 265.0], [54.4, 265.0], [54.5, 265.0], [54.6, 265.0], [54.7, 267.0], [54.8, 267.0], [54.9, 267.0], [55.0, 267.0], [55.1, 267.0], [55.2, 269.0], [55.3, 269.0], [55.4, 269.0], [55.5, 269.0], [55.6, 269.0], [55.7, 270.0], [55.8, 270.0], [55.9, 270.0], [56.0, 270.0], [56.1, 272.0], [56.2, 272.0], [56.3, 272.0], [56.4, 272.0], [56.5, 272.0], [56.6, 273.0], [56.7, 273.0], [56.8, 273.0], [56.9, 273.0], [57.0, 273.0], [57.1, 275.0], [57.2, 275.0], [57.3, 275.0], [57.4, 275.0], [57.5, 276.0], [57.6, 276.0], [57.7, 276.0], [57.8, 276.0], [57.9, 276.0], [58.0, 277.0], [58.1, 277.0], [58.2, 277.0], [58.3, 277.0], [58.4, 277.0], [58.5, 278.0], [58.6, 278.0], [58.7, 278.0], [58.8, 278.0], [58.9, 280.0], [59.0, 280.0], [59.1, 280.0], [59.2, 280.0], [59.3, 280.0], [59.4, 281.0], [59.5, 281.0], [59.6, 281.0], [59.7, 281.0], [59.8, 281.0], [59.9, 281.0], [60.0, 281.0], [60.1, 281.0], [60.2, 281.0], [60.3, 284.0], [60.4, 284.0], [60.5, 284.0], [60.6, 284.0], [60.7, 284.0], [60.8, 286.0], [60.9, 286.0], [61.0, 286.0], [61.1, 286.0], [61.2, 286.0], [61.3, 288.0], [61.4, 288.0], [61.5, 288.0], [61.6, 288.0], [61.7, 289.0], [61.8, 289.0], [61.9, 289.0], [62.0, 289.0], [62.1, 289.0], [62.2, 292.0], [62.3, 292.0], [62.4, 292.0], [62.5, 292.0], [62.6, 292.0], [62.7, 293.0], [62.8, 293.0], [62.9, 293.0], [63.0, 293.0], [63.1, 293.0], [63.2, 293.0], [63.3, 293.0], [63.4, 293.0], [63.5, 293.0], [63.6, 294.0], [63.7, 294.0], [63.8, 294.0], [63.9, 294.0], [64.0, 294.0], [64.1, 294.0], [64.2, 294.0], [64.3, 294.0], [64.4, 294.0], [64.5, 295.0], [64.6, 295.0], [64.7, 295.0], [64.8, 295.0], [64.9, 295.0], [65.0, 298.0], [65.1, 298.0], [65.2, 298.0], [65.3, 298.0], [65.4, 298.0], [65.5, 302.0], [65.6, 302.0], [65.7, 302.0], [65.8, 302.0], [65.9, 313.0], [66.0, 313.0], [66.1, 313.0], [66.2, 313.0], [66.3, 313.0], [66.4, 313.0], [66.5, 313.0], [66.6, 313.0], [66.7, 313.0], [66.8, 313.0], [66.9, 314.0], [67.0, 314.0], [67.1, 314.0], [67.2, 314.0], [67.3, 314.0], [67.4, 314.0], [67.5, 314.0], [67.6, 314.0], [67.7, 314.0], [67.8, 314.0], [67.9, 314.0], [68.0, 314.0], [68.1, 314.0], [68.2, 314.0], [68.3, 315.0], [68.4, 315.0], [68.5, 315.0], [68.6, 315.0], [68.7, 316.0], [68.8, 316.0], [68.9, 316.0], [69.0, 316.0], [69.1, 316.0], [69.2, 317.0], [69.3, 317.0], [69.4, 317.0], [69.5, 317.0], [69.6, 317.0], [69.7, 318.0], [69.8, 318.0], [69.9, 318.0], [70.0, 318.0], [70.1, 320.0], [70.2, 320.0], [70.3, 320.0], [70.4, 320.0], [70.5, 320.0], [70.6, 320.0], [70.7, 320.0], [70.8, 320.0], [70.9, 320.0], [71.0, 320.0], [71.1, 320.0], [71.2, 320.0], [71.3, 320.0], [71.4, 320.0], [71.5, 323.0], [71.6, 323.0], [71.7, 323.0], [71.8, 323.0], [71.9, 323.0], [72.0, 326.0], [72.1, 326.0], [72.2, 326.0], [72.3, 326.0], [72.4, 326.0], [72.5, 328.0], [72.6, 328.0], [72.7, 328.0], [72.8, 328.0], [72.9, 329.0], [73.0, 329.0], [73.1, 329.0], [73.2, 329.0], [73.3, 329.0], [73.4, 331.0], [73.5, 331.0], [73.6, 331.0], [73.7, 331.0], [73.8, 331.0], [73.9, 332.0], [74.0, 332.0], [74.1, 332.0], [74.2, 332.0], [74.3, 337.0], [74.4, 337.0], [74.5, 337.0], [74.6, 337.0], [74.7, 337.0], [74.8, 339.0], [74.9, 339.0], [75.0, 339.0], [75.1, 339.0], [75.2, 339.0], [75.3, 339.0], [75.4, 339.0], [75.5, 339.0], [75.6, 339.0], [75.7, 339.0], [75.8, 344.0], [75.9, 344.0], [76.0, 344.0], [76.1, 344.0], [76.2, 344.0], [76.3, 344.0], [76.4, 344.0], [76.5, 344.0], [76.6, 344.0], [76.7, 345.0], [76.8, 345.0], [76.9, 345.0], [77.0, 345.0], [77.1, 345.0], [77.2, 347.0], [77.3, 347.0], [77.4, 347.0], [77.5, 347.0], [77.6, 349.0], [77.7, 349.0], [77.8, 349.0], [77.9, 349.0], [78.0, 349.0], [78.1, 357.0], [78.2, 357.0], [78.3, 357.0], [78.4, 357.0], [78.5, 357.0], [78.6, 359.0], [78.7, 359.0], [78.8, 359.0], [78.9, 359.0], [79.0, 364.0], [79.1, 364.0], [79.2, 364.0], [79.3, 364.0], [79.4, 364.0], [79.5, 365.0], [79.6, 365.0], [79.7, 365.0], [79.8, 365.0], [79.9, 365.0], [80.0, 366.0], [80.1, 366.0], [80.2, 366.0], [80.3, 366.0], [80.4, 370.0], [80.5, 370.0], [80.6, 370.0], [80.7, 370.0], [80.8, 370.0], [80.9, 372.0], [81.0, 372.0], [81.1, 372.0], [81.2, 372.0], [81.3, 372.0], [81.4, 372.0], [81.5, 372.0], [81.6, 372.0], [81.7, 372.0], [81.8, 394.0], [81.9, 394.0], [82.0, 394.0], [82.1, 394.0], [82.2, 394.0], [82.3, 395.0], [82.4, 395.0], [82.5, 395.0], [82.6, 395.0], [82.7, 395.0], [82.8, 401.0], [82.9, 401.0], [83.0, 401.0], [83.1, 401.0], [83.2, 403.0], [83.3, 403.0], [83.4, 403.0], [83.5, 403.0], [83.6, 403.0], [83.7, 405.0], [83.8, 405.0], [83.9, 405.0], [84.0, 405.0], [84.1, 405.0], [84.2, 410.0], [84.3, 410.0], [84.4, 410.0], [84.5, 410.0], [84.6, 413.0], [84.7, 413.0], [84.8, 413.0], [84.9, 413.0], [85.0, 413.0], [85.1, 428.0], [85.2, 428.0], [85.3, 428.0], [85.4, 428.0], [85.5, 428.0], [85.6, 433.0], [85.7, 433.0], [85.8, 433.0], [85.9, 433.0], [86.0, 434.0], [86.1, 434.0], [86.2, 434.0], [86.3, 434.0], [86.4, 434.0], [86.5, 435.0], [86.6, 435.0], [86.7, 435.0], [86.8, 435.0], [86.9, 435.0], [87.0, 438.0], [87.1, 438.0], [87.2, 438.0], [87.3, 438.0], [87.4, 440.0], [87.5, 440.0], [87.6, 440.0], [87.7, 440.0], [87.8, 440.0], [87.9, 451.0], [88.0, 451.0], [88.1, 451.0], [88.2, 451.0], [88.3, 451.0], [88.4, 457.0], [88.5, 457.0], [88.6, 457.0], [88.7, 457.0], [88.8, 461.0], [88.9, 461.0], [89.0, 461.0], [89.1, 461.0], [89.2, 461.0], [89.3, 464.0], [89.4, 464.0], [89.5, 464.0], [89.6, 464.0], [89.7, 464.0], [89.8, 465.0], [89.9, 465.0], [90.0, 465.0], [90.1, 465.0], [90.2, 465.0], [90.3, 465.0], [90.4, 465.0], [90.5, 465.0], [90.6, 465.0], [90.7, 494.0], [90.8, 494.0], [90.9, 494.0], [91.0, 494.0], [91.1, 494.0], [91.2, 499.0], [91.3, 499.0], [91.4, 499.0], [91.5, 499.0], [91.6, 500.0], [91.7, 500.0], [91.8, 500.0], [91.9, 500.0], [92.0, 500.0], [92.1, 502.0], [92.2, 502.0], [92.3, 502.0], [92.4, 502.0], [92.5, 502.0], [92.6, 502.0], [92.7, 502.0], [92.8, 502.0], [92.9, 502.0], [93.0, 520.0], [93.1, 520.0], [93.2, 520.0], [93.3, 520.0], [93.4, 520.0], [93.5, 521.0], [93.6, 521.0], [93.7, 521.0], [93.8, 521.0], [93.9, 521.0], [94.0, 538.0], [94.1, 538.0], [94.2, 538.0], [94.3, 538.0], [94.4, 550.0], [94.5, 550.0], [94.6, 550.0], [94.7, 550.0], [94.8, 550.0], [94.9, 558.0], [95.0, 558.0], [95.1, 558.0], [95.2, 558.0], [95.3, 558.0], [95.4, 573.0], [95.5, 573.0], [95.6, 573.0], [95.7, 573.0], [95.8, 575.0], [95.9, 575.0], [96.0, 575.0], [96.1, 575.0], [96.2, 575.0], [96.3, 582.0], [96.4, 582.0], [96.5, 582.0], [96.6, 582.0], [96.7, 582.0], [96.8, 587.0], [96.9, 587.0], [97.0, 587.0], [97.1, 587.0], [97.2, 597.0], [97.3, 597.0], [97.4, 597.0], [97.5, 597.0], [97.6, 597.0], [97.7, 613.0], [97.8, 613.0], [97.9, 613.0], [98.0, 613.0], [98.1, 613.0], [98.2, 670.0], [98.3, 670.0], [98.4, 670.0], [98.5, 670.0], [98.6, 709.0], [98.7, 709.0], [98.8, 709.0], [98.9, 709.0], [99.0, 709.0], [99.1, 732.0], [99.2, 732.0], [99.3, 732.0], [99.4, 732.0], [99.5, 732.0], [99.6, 1070.0], [99.7, 1070.0], [99.8, 1070.0], [99.9, 1070.0]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 100.0, "series": [{"data": [[300.0, 37.0], [600.0, 2.0], [700.0, 2.0], [100.0, 40.0], [200.0, 100.0], [400.0, 19.0], [1000.0, 1.0], [500.0, 13.0]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 17.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 197.0, "series": [{"data": [[0.0, 197.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 17.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.4, "minX": 1.79362254E12, "maxY": 4.909090909090911, "series": [{"data": [[1.79362254E12, 2.4], [1.7936226E12, 4.909090909090911]], "isOverall": false, "label": "Virtual users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7936226E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 287.57070707070704, "minX": 1.0, "maxY": 503.75, "series": [{"data": [[2.0, 503.75], [4.0, 335.0], [1.0, 440.0], [5.0, 287.57070707070704], [3.0, 335.2]], "isOverall": false, "label": "POST /api/pizza", "isController": false}, {"data": [[4.850467289719628, 294.7663551401867]], "isOverall": false, "label": "POST /api/pizza-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 30.833333333333332, "minX": 1.79362254E12, "maxY": 4043.85, "series": [{"data": [[1.79362254E12, 95.3], [1.7936226E12, 4043.85]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.79362254E12, 30.833333333333332], [1.7936226E12, 1288.8333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7936226E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 291.334928229665, "minX": 1.79362254E12, "maxY": 438.2, "series": [{"data": [[1.79362254E12, 438.2], [1.7936226E12, 291.334928229665]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7936226E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 291.28708133971287, "minX": 1.79362254E12, "maxY": 437.6, "series": [{"data": [[1.79362254E12, 437.6], [1.7936226E12, 291.28708133971287]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7936226E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 4.157894736842108, "minX": 1.79362254E12, "maxY": 191.8, "series": [{"data": [[1.79362254E12, 191.8], [1.7936226E12, 4.157894736842108]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7936226E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 150.0, "minX": 1.79362254E12, "maxY": 1070.0, "series": [{"data": [[1.79362254E12, 1070.0], [1.7936226E12, 732.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.79362254E12, 168.0], [1.7936226E12, 150.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.79362254E12, 1070.0], [1.7936226E12, 464.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.79362254E12, 1070.0], [1.7936226E12, 705.1000000000003]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.79362254E12, 210.0], [1.7936226E12, 253.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.79362254E12, 1070.0], [1.7936226E12, 554.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7936226E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 210.0, "minX": 1.0, "maxY": 360.0, "series": [{"data": [[1.0, 210.0], [2.0, 360.0], [4.0, 257.5], [5.0, 251.0], [3.0, 247.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 210.0, "minX": 1.0, "maxY": 360.0, "series": [{"data": [[1.0, 210.0], [2.0, 360.0], [4.0, 257.5], [5.0, 251.0], [3.0, 247.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.11666666666666667, "minX": 1.79362254E12, "maxY": 3.45, "series": [{"data": [[1.79362254E12, 0.11666666666666667], [1.7936226E12, 3.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7936226E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.79362254E12, "maxY": 3.4833333333333334, "series": [{"data": [[1.79362254E12, 0.08333333333333333], [1.7936226E12, 3.4833333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7936226E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.79362254E12, "maxY": 3.4833333333333334, "series": [{"data": [[1.79362254E12, 0.08333333333333333], [1.7936226E12, 3.4833333333333334]], "isOverall": false, "label": "POST /api/pizza-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7936226E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.79362254E12, "maxY": 3.4833333333333334, "series": [{"data": [[1.79362254E12, 0.08333333333333333], [1.7936226E12, 3.4833333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7936226E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

