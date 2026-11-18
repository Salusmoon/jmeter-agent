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
        data: {"result": {"minY": 159.0, "minX": 0.0, "maxY": 1055.0, "series": [{"data": [[0.0, 159.0], [0.1, 159.0], [0.2, 159.0], [0.3, 159.0], [0.4, 159.0], [0.5, 162.0], [0.6, 162.0], [0.7, 162.0], [0.8, 162.0], [0.9, 162.0], [1.0, 163.0], [1.1, 163.0], [1.2, 163.0], [1.3, 163.0], [1.4, 163.0], [1.5, 165.0], [1.6, 165.0], [1.7, 165.0], [1.8, 165.0], [1.9, 167.0], [2.0, 167.0], [2.1, 167.0], [2.2, 167.0], [2.3, 167.0], [2.4, 167.0], [2.5, 167.0], [2.6, 167.0], [2.7, 167.0], [2.8, 167.0], [2.9, 167.0], [3.0, 167.0], [3.1, 167.0], [3.2, 167.0], [3.3, 167.0], [3.4, 168.0], [3.5, 168.0], [3.6, 168.0], [3.7, 168.0], [3.8, 169.0], [3.9, 169.0], [4.0, 169.0], [4.1, 169.0], [4.2, 169.0], [4.3, 171.0], [4.4, 171.0], [4.5, 171.0], [4.6, 171.0], [4.7, 171.0], [4.8, 172.0], [4.9, 172.0], [5.0, 172.0], [5.1, 172.0], [5.2, 173.0], [5.3, 173.0], [5.4, 173.0], [5.5, 173.0], [5.6, 173.0], [5.7, 173.0], [5.8, 173.0], [5.9, 173.0], [6.0, 173.0], [6.1, 173.0], [6.2, 174.0], [6.3, 174.0], [6.4, 174.0], [6.5, 174.0], [6.6, 174.0], [6.7, 174.0], [6.8, 174.0], [6.9, 174.0], [7.0, 174.0], [7.1, 175.0], [7.2, 175.0], [7.3, 175.0], [7.4, 175.0], [7.5, 175.0], [7.6, 175.0], [7.7, 175.0], [7.8, 175.0], [7.9, 175.0], [8.0, 175.0], [8.1, 176.0], [8.2, 176.0], [8.3, 176.0], [8.4, 176.0], [8.5, 177.0], [8.6, 177.0], [8.7, 177.0], [8.8, 177.0], [8.9, 177.0], [9.0, 178.0], [9.1, 178.0], [9.2, 178.0], [9.3, 178.0], [9.4, 178.0], [9.5, 178.0], [9.6, 178.0], [9.7, 178.0], [9.8, 178.0], [9.9, 178.0], [10.0, 179.0], [10.1, 179.0], [10.2, 179.0], [10.3, 179.0], [10.4, 179.0], [10.5, 179.0], [10.6, 179.0], [10.7, 179.0], [10.8, 179.0], [10.9, 181.0], [11.0, 181.0], [11.1, 181.0], [11.2, 181.0], [11.3, 181.0], [11.4, 181.0], [11.5, 181.0], [11.6, 181.0], [11.7, 181.0], [11.8, 182.0], [11.9, 182.0], [12.0, 182.0], [12.1, 182.0], [12.2, 182.0], [12.3, 182.0], [12.4, 182.0], [12.5, 182.0], [12.6, 182.0], [12.7, 182.0], [12.8, 182.0], [12.9, 182.0], [13.0, 182.0], [13.1, 182.0], [13.2, 182.0], [13.3, 185.0], [13.4, 185.0], [13.5, 185.0], [13.6, 185.0], [13.7, 188.0], [13.8, 188.0], [13.9, 188.0], [14.0, 188.0], [14.1, 188.0], [14.2, 190.0], [14.3, 190.0], [14.4, 190.0], [14.5, 190.0], [14.6, 190.0], [14.7, 190.0], [14.8, 190.0], [14.9, 190.0], [15.0, 190.0], [15.1, 192.0], [15.2, 192.0], [15.3, 192.0], [15.4, 192.0], [15.5, 192.0], [15.6, 193.0], [15.7, 193.0], [15.8, 193.0], [15.9, 193.0], [16.0, 193.0], [16.1, 193.0], [16.2, 193.0], [16.3, 193.0], [16.4, 193.0], [16.5, 193.0], [16.6, 195.0], [16.7, 195.0], [16.8, 195.0], [16.9, 195.0], [17.0, 196.0], [17.1, 196.0], [17.2, 196.0], [17.3, 196.0], [17.4, 196.0], [17.5, 196.0], [17.6, 196.0], [17.7, 196.0], [17.8, 196.0], [17.9, 196.0], [18.0, 197.0], [18.1, 197.0], [18.2, 197.0], [18.3, 197.0], [18.4, 197.0], [18.5, 197.0], [18.6, 197.0], [18.7, 197.0], [18.8, 197.0], [18.9, 198.0], [19.0, 198.0], [19.1, 198.0], [19.2, 198.0], [19.3, 198.0], [19.4, 199.0], [19.5, 199.0], [19.6, 199.0], [19.7, 199.0], [19.8, 199.0], [19.9, 199.0], [20.0, 199.0], [20.1, 199.0], [20.2, 199.0], [20.3, 200.0], [20.4, 200.0], [20.5, 200.0], [20.6, 200.0], [20.7, 200.0], [20.8, 201.0], [20.9, 201.0], [21.0, 201.0], [21.1, 201.0], [21.2, 201.0], [21.3, 202.0], [21.4, 202.0], [21.5, 202.0], [21.6, 202.0], [21.7, 202.0], [21.8, 202.0], [21.9, 202.0], [22.0, 202.0], [22.1, 202.0], [22.2, 203.0], [22.3, 203.0], [22.4, 203.0], [22.5, 203.0], [22.6, 203.0], [22.7, 204.0], [22.8, 204.0], [22.9, 204.0], [23.0, 204.0], [23.1, 204.0], [23.2, 205.0], [23.3, 205.0], [23.4, 205.0], [23.5, 205.0], [23.6, 205.0], [23.7, 205.0], [23.8, 205.0], [23.9, 205.0], [24.0, 205.0], [24.1, 205.0], [24.2, 205.0], [24.3, 205.0], [24.4, 205.0], [24.5, 205.0], [24.6, 205.0], [24.7, 205.0], [24.8, 205.0], [24.9, 205.0], [25.0, 208.0], [25.1, 208.0], [25.2, 208.0], [25.3, 208.0], [25.4, 208.0], [25.5, 208.0], [25.6, 208.0], [25.7, 208.0], [25.8, 208.0], [25.9, 208.0], [26.0, 210.0], [26.1, 210.0], [26.2, 210.0], [26.3, 210.0], [26.4, 210.0], [26.5, 211.0], [26.6, 211.0], [26.7, 211.0], [26.8, 211.0], [26.9, 214.0], [27.0, 214.0], [27.1, 214.0], [27.2, 214.0], [27.3, 214.0], [27.4, 216.0], [27.5, 216.0], [27.6, 216.0], [27.7, 216.0], [27.8, 216.0], [27.9, 217.0], [28.0, 217.0], [28.1, 217.0], [28.2, 217.0], [28.3, 217.0], [28.4, 217.0], [28.5, 217.0], [28.6, 217.0], [28.7, 217.0], [28.8, 217.0], [28.9, 217.0], [29.0, 217.0], [29.1, 217.0], [29.2, 217.0], [29.3, 219.0], [29.4, 219.0], [29.5, 219.0], [29.6, 219.0], [29.7, 219.0], [29.8, 219.0], [29.9, 219.0], [30.0, 219.0], [30.1, 219.0], [30.2, 220.0], [30.3, 220.0], [30.4, 220.0], [30.5, 220.0], [30.6, 220.0], [30.7, 221.0], [30.8, 221.0], [30.9, 221.0], [31.0, 221.0], [31.1, 221.0], [31.2, 222.0], [31.3, 222.0], [31.4, 222.0], [31.5, 222.0], [31.6, 222.0], [31.7, 222.0], [31.8, 222.0], [31.9, 222.0], [32.0, 222.0], [32.1, 224.0], [32.2, 224.0], [32.3, 224.0], [32.4, 224.0], [32.5, 224.0], [32.6, 226.0], [32.7, 226.0], [32.8, 226.0], [32.9, 226.0], [33.0, 226.0], [33.1, 226.0], [33.2, 226.0], [33.3, 226.0], [33.4, 226.0], [33.5, 227.0], [33.6, 227.0], [33.7, 227.0], [33.8, 227.0], [33.9, 227.0], [34.0, 227.0], [34.1, 227.0], [34.2, 227.0], [34.3, 227.0], [34.4, 227.0], [34.5, 231.0], [34.6, 231.0], [34.7, 231.0], [34.8, 231.0], [34.9, 231.0], [35.0, 231.0], [35.1, 231.0], [35.2, 231.0], [35.3, 231.0], [35.4, 232.0], [35.5, 232.0], [35.6, 232.0], [35.7, 232.0], [35.8, 232.0], [35.9, 235.0], [36.0, 235.0], [36.1, 235.0], [36.2, 235.0], [36.3, 235.0], [36.4, 238.0], [36.5, 238.0], [36.6, 238.0], [36.7, 238.0], [36.8, 239.0], [36.9, 239.0], [37.0, 239.0], [37.1, 239.0], [37.2, 239.0], [37.3, 239.0], [37.4, 239.0], [37.5, 239.0], [37.6, 239.0], [37.7, 239.0], [37.8, 240.0], [37.9, 240.0], [38.0, 240.0], [38.1, 240.0], [38.2, 240.0], [38.3, 240.0], [38.4, 240.0], [38.5, 240.0], [38.6, 240.0], [38.7, 240.0], [38.8, 240.0], [38.9, 240.0], [39.0, 240.0], [39.1, 240.0], [39.2, 240.0], [39.3, 240.0], [39.4, 240.0], [39.5, 240.0], [39.6, 240.0], [39.7, 241.0], [39.8, 241.0], [39.9, 241.0], [40.0, 241.0], [40.1, 241.0], [40.2, 241.0], [40.3, 241.0], [40.4, 241.0], [40.5, 241.0], [40.6, 242.0], [40.7, 242.0], [40.8, 242.0], [40.9, 242.0], [41.0, 242.0], [41.1, 242.0], [41.2, 242.0], [41.3, 242.0], [41.4, 242.0], [41.5, 242.0], [41.6, 242.0], [41.7, 242.0], [41.8, 242.0], [41.9, 242.0], [42.0, 242.0], [42.1, 242.0], [42.2, 242.0], [42.3, 242.0], [42.4, 242.0], [42.5, 243.0], [42.6, 243.0], [42.7, 243.0], [42.8, 243.0], [42.9, 243.0], [43.0, 243.0], [43.1, 243.0], [43.2, 243.0], [43.3, 243.0], [43.4, 244.0], [43.5, 244.0], [43.6, 244.0], [43.7, 244.0], [43.8, 244.0], [43.9, 244.0], [44.0, 244.0], [44.1, 244.0], [44.2, 244.0], [44.3, 244.0], [44.4, 244.0], [44.5, 244.0], [44.6, 244.0], [44.7, 244.0], [44.8, 244.0], [44.9, 246.0], [45.0, 246.0], [45.1, 246.0], [45.2, 246.0], [45.3, 246.0], [45.4, 246.0], [45.5, 246.0], [45.6, 246.0], [45.7, 246.0], [45.8, 247.0], [45.9, 247.0], [46.0, 247.0], [46.1, 247.0], [46.2, 247.0], [46.3, 247.0], [46.4, 247.0], [46.5, 247.0], [46.6, 247.0], [46.7, 248.0], [46.8, 248.0], [46.9, 248.0], [47.0, 248.0], [47.1, 248.0], [47.2, 249.0], [47.3, 249.0], [47.4, 249.0], [47.5, 249.0], [47.6, 249.0], [47.7, 250.0], [47.8, 250.0], [47.9, 250.0], [48.0, 250.0], [48.1, 250.0], [48.2, 251.0], [48.3, 251.0], [48.4, 251.0], [48.5, 251.0], [48.6, 251.0], [48.7, 251.0], [48.8, 251.0], [48.9, 251.0], [49.0, 251.0], [49.1, 252.0], [49.2, 252.0], [49.3, 252.0], [49.4, 252.0], [49.5, 252.0], [49.6, 252.0], [49.7, 252.0], [49.8, 252.0], [49.9, 252.0], [50.0, 255.0], [50.1, 255.0], [50.2, 255.0], [50.3, 255.0], [50.4, 255.0], [50.5, 255.0], [50.6, 255.0], [50.7, 255.0], [50.8, 255.0], [50.9, 255.0], [51.0, 255.0], [51.1, 255.0], [51.2, 255.0], [51.3, 255.0], [51.4, 255.0], [51.5, 255.0], [51.6, 255.0], [51.7, 255.0], [51.8, 255.0], [51.9, 256.0], [52.0, 256.0], [52.1, 256.0], [52.2, 256.0], [52.3, 256.0], [52.4, 256.0], [52.5, 256.0], [52.6, 256.0], [52.7, 256.0], [52.8, 256.0], [52.9, 257.0], [53.0, 257.0], [53.1, 257.0], [53.2, 257.0], [53.3, 257.0], [53.4, 258.0], [53.5, 258.0], [53.6, 258.0], [53.7, 258.0], [53.8, 259.0], [53.9, 259.0], [54.0, 259.0], [54.1, 259.0], [54.2, 259.0], [54.3, 260.0], [54.4, 260.0], [54.5, 260.0], [54.6, 260.0], [54.7, 260.0], [54.8, 261.0], [54.9, 261.0], [55.0, 261.0], [55.1, 261.0], [55.2, 261.0], [55.3, 261.0], [55.4, 261.0], [55.5, 261.0], [55.6, 261.0], [55.7, 262.0], [55.8, 262.0], [55.9, 262.0], [56.0, 262.0], [56.1, 262.0], [56.2, 264.0], [56.3, 264.0], [56.4, 264.0], [56.5, 264.0], [56.6, 264.0], [56.7, 268.0], [56.8, 268.0], [56.9, 268.0], [57.0, 268.0], [57.1, 269.0], [57.2, 269.0], [57.3, 269.0], [57.4, 269.0], [57.5, 269.0], [57.6, 271.0], [57.7, 271.0], [57.8, 271.0], [57.9, 271.0], [58.0, 271.0], [58.1, 272.0], [58.2, 272.0], [58.3, 272.0], [58.4, 272.0], [58.5, 275.0], [58.6, 275.0], [58.7, 275.0], [58.8, 275.0], [58.9, 275.0], [59.0, 276.0], [59.1, 276.0], [59.2, 276.0], [59.3, 276.0], [59.4, 276.0], [59.5, 276.0], [59.6, 276.0], [59.7, 276.0], [59.8, 276.0], [59.9, 276.0], [60.0, 276.0], [60.1, 276.0], [60.2, 276.0], [60.3, 276.0], [60.4, 279.0], [60.5, 279.0], [60.6, 279.0], [60.7, 279.0], [60.8, 279.0], [60.9, 283.0], [61.0, 283.0], [61.1, 283.0], [61.2, 283.0], [61.3, 283.0], [61.4, 283.0], [61.5, 283.0], [61.6, 283.0], [61.7, 283.0], [61.8, 286.0], [61.9, 286.0], [62.0, 286.0], [62.1, 286.0], [62.2, 286.0], [62.3, 287.0], [62.4, 287.0], [62.5, 287.0], [62.6, 287.0], [62.7, 287.0], [62.8, 291.0], [62.9, 291.0], [63.0, 291.0], [63.1, 291.0], [63.2, 291.0], [63.3, 293.0], [63.4, 293.0], [63.5, 293.0], [63.6, 293.0], [63.7, 296.0], [63.8, 296.0], [63.9, 296.0], [64.0, 296.0], [64.1, 296.0], [64.2, 298.0], [64.3, 298.0], [64.4, 298.0], [64.5, 298.0], [64.6, 298.0], [64.7, 301.0], [64.8, 301.0], [64.9, 301.0], [65.0, 301.0], [65.1, 305.0], [65.2, 305.0], [65.3, 305.0], [65.4, 305.0], [65.5, 305.0], [65.6, 306.0], [65.7, 306.0], [65.8, 306.0], [65.9, 306.0], [66.0, 306.0], [66.1, 307.0], [66.2, 307.0], [66.3, 307.0], [66.4, 307.0], [66.5, 307.0], [66.6, 311.0], [66.7, 311.0], [66.8, 311.0], [66.9, 311.0], [67.0, 312.0], [67.1, 312.0], [67.2, 312.0], [67.3, 312.0], [67.4, 312.0], [67.5, 313.0], [67.6, 313.0], [67.7, 313.0], [67.8, 313.0], [67.9, 313.0], [68.0, 319.0], [68.1, 319.0], [68.2, 319.0], [68.3, 319.0], [68.4, 323.0], [68.5, 323.0], [68.6, 323.0], [68.7, 323.0], [68.8, 323.0], [68.9, 323.0], [69.0, 323.0], [69.1, 323.0], [69.2, 323.0], [69.3, 323.0], [69.4, 323.0], [69.5, 323.0], [69.6, 323.0], [69.7, 323.0], [69.8, 323.0], [69.9, 324.0], [70.0, 324.0], [70.1, 324.0], [70.2, 324.0], [70.3, 325.0], [70.4, 325.0], [70.5, 325.0], [70.6, 325.0], [70.7, 325.0], [70.8, 327.0], [70.9, 327.0], [71.0, 327.0], [71.1, 327.0], [71.2, 327.0], [71.3, 328.0], [71.4, 328.0], [71.5, 328.0], [71.6, 328.0], [71.7, 329.0], [71.8, 329.0], [71.9, 329.0], [72.0, 329.0], [72.1, 329.0], [72.2, 330.0], [72.3, 330.0], [72.4, 330.0], [72.5, 330.0], [72.6, 330.0], [72.7, 337.0], [72.8, 337.0], [72.9, 337.0], [73.0, 337.0], [73.1, 337.0], [73.2, 350.0], [73.3, 350.0], [73.4, 350.0], [73.5, 350.0], [73.6, 352.0], [73.7, 352.0], [73.8, 352.0], [73.9, 352.0], [74.0, 352.0], [74.1, 353.0], [74.2, 353.0], [74.3, 353.0], [74.4, 353.0], [74.5, 353.0], [74.6, 355.0], [74.7, 355.0], [74.8, 355.0], [74.9, 355.0], [75.0, 355.0], [75.1, 357.0], [75.2, 357.0], [75.3, 357.0], [75.4, 357.0], [75.5, 358.0], [75.6, 358.0], [75.7, 358.0], [75.8, 358.0], [75.9, 358.0], [76.0, 359.0], [76.1, 359.0], [76.2, 359.0], [76.3, 359.0], [76.4, 359.0], [76.5, 366.0], [76.6, 366.0], [76.7, 366.0], [76.8, 366.0], [76.9, 366.0], [77.0, 366.0], [77.1, 366.0], [77.2, 366.0], [77.3, 366.0], [77.4, 369.0], [77.5, 369.0], [77.6, 369.0], [77.7, 369.0], [77.8, 369.0], [77.9, 369.0], [78.0, 369.0], [78.1, 369.0], [78.2, 369.0], [78.3, 369.0], [78.4, 371.0], [78.5, 371.0], [78.6, 371.0], [78.7, 371.0], [78.8, 372.0], [78.9, 372.0], [79.0, 372.0], [79.1, 372.0], [79.2, 372.0], [79.3, 372.0], [79.4, 372.0], [79.5, 372.0], [79.6, 372.0], [79.7, 372.0], [79.8, 380.0], [79.9, 380.0], [80.0, 380.0], [80.1, 380.0], [80.2, 382.0], [80.3, 382.0], [80.4, 382.0], [80.5, 382.0], [80.6, 382.0], [80.7, 386.0], [80.8, 386.0], [80.9, 386.0], [81.0, 386.0], [81.1, 386.0], [81.2, 389.0], [81.3, 389.0], [81.4, 389.0], [81.5, 389.0], [81.6, 389.0], [81.7, 389.0], [81.8, 389.0], [81.9, 389.0], [82.0, 389.0], [82.1, 403.0], [82.2, 403.0], [82.3, 403.0], [82.4, 403.0], [82.5, 403.0], [82.6, 404.0], [82.7, 404.0], [82.8, 404.0], [82.9, 404.0], [83.0, 404.0], [83.1, 406.0], [83.2, 406.0], [83.3, 406.0], [83.4, 406.0], [83.5, 408.0], [83.6, 408.0], [83.7, 408.0], [83.8, 408.0], [83.9, 408.0], [84.0, 408.0], [84.1, 408.0], [84.2, 408.0], [84.3, 408.0], [84.4, 408.0], [84.5, 413.0], [84.6, 413.0], [84.7, 413.0], [84.8, 413.0], [84.9, 413.0], [85.0, 414.0], [85.1, 414.0], [85.2, 414.0], [85.3, 414.0], [85.4, 416.0], [85.5, 416.0], [85.6, 416.0], [85.7, 416.0], [85.8, 416.0], [85.9, 416.0], [86.0, 416.0], [86.1, 416.0], [86.2, 416.0], [86.3, 416.0], [86.4, 425.0], [86.5, 425.0], [86.6, 425.0], [86.7, 425.0], [86.8, 437.0], [86.9, 437.0], [87.0, 437.0], [87.1, 437.0], [87.2, 437.0], [87.3, 439.0], [87.4, 439.0], [87.5, 439.0], [87.6, 439.0], [87.7, 439.0], [87.8, 444.0], [87.9, 444.0], [88.0, 444.0], [88.1, 444.0], [88.2, 444.0], [88.3, 447.0], [88.4, 447.0], [88.5, 447.0], [88.6, 447.0], [88.7, 460.0], [88.8, 460.0], [88.9, 460.0], [89.0, 460.0], [89.1, 460.0], [89.2, 462.0], [89.3, 462.0], [89.4, 462.0], [89.5, 462.0], [89.6, 462.0], [89.7, 466.0], [89.8, 466.0], [89.9, 466.0], [90.0, 466.0], [90.1, 468.0], [90.2, 468.0], [90.3, 468.0], [90.4, 468.0], [90.5, 468.0], [90.6, 480.0], [90.7, 480.0], [90.8, 480.0], [90.9, 480.0], [91.0, 480.0], [91.1, 489.0], [91.2, 489.0], [91.3, 489.0], [91.4, 489.0], [91.5, 489.0], [91.6, 489.0], [91.7, 489.0], [91.8, 489.0], [91.9, 489.0], [92.0, 503.0], [92.1, 503.0], [92.2, 503.0], [92.3, 503.0], [92.4, 503.0], [92.5, 505.0], [92.6, 505.0], [92.7, 505.0], [92.8, 505.0], [92.9, 505.0], [93.0, 516.0], [93.1, 516.0], [93.2, 516.0], [93.3, 516.0], [93.4, 517.0], [93.5, 517.0], [93.6, 517.0], [93.7, 517.0], [93.8, 517.0], [93.9, 520.0], [94.0, 520.0], [94.1, 520.0], [94.2, 520.0], [94.3, 520.0], [94.4, 531.0], [94.5, 531.0], [94.6, 531.0], [94.7, 531.0], [94.8, 531.0], [94.9, 538.0], [95.0, 538.0], [95.1, 538.0], [95.2, 538.0], [95.3, 577.0], [95.4, 577.0], [95.5, 577.0], [95.6, 577.0], [95.7, 577.0], [95.8, 593.0], [95.9, 593.0], [96.0, 593.0], [96.1, 593.0], [96.2, 593.0], [96.3, 621.0], [96.4, 621.0], [96.5, 621.0], [96.6, 621.0], [96.7, 622.0], [96.8, 622.0], [96.9, 622.0], [97.0, 622.0], [97.1, 622.0], [97.2, 636.0], [97.3, 636.0], [97.4, 636.0], [97.5, 636.0], [97.6, 636.0], [97.7, 649.0], [97.8, 649.0], [97.9, 649.0], [98.0, 649.0], [98.1, 649.0], [98.2, 774.0], [98.3, 774.0], [98.4, 774.0], [98.5, 774.0], [98.6, 908.0], [98.7, 908.0], [98.8, 908.0], [98.9, 908.0], [99.0, 908.0], [99.1, 1050.0], [99.2, 1050.0], [99.3, 1050.0], [99.4, 1050.0], [99.5, 1050.0], [99.6, 1055.0], [99.7, 1055.0], [99.8, 1055.0], [99.9, 1055.0], [100.0, 1055.0]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 94.0, "series": [{"data": [[300.0, 37.0], [600.0, 4.0], [700.0, 1.0], [200.0, 94.0], [400.0, 21.0], [100.0, 43.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 9.0]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 17.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 195.0, "series": [{"data": [[0.0, 195.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 17.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 4.23076923076923, "minX": 1.7936217E12, "maxY": 4.946236559139785, "series": [{"data": [[1.7936217E12, 4.23076923076923], [1.79362176E12, 4.946236559139785]], "isOverall": false, "label": "Virtual users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79362176E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 259.0, "minX": 1.0, "maxY": 518.75, "series": [{"data": [[2.0, 518.75], [4.0, 372.125], [1.0, 259.0], [5.0, 292.8418367346939], [3.0, 301.3333333333333]], "isOverall": false, "label": "POST /api/pizza", "isController": false}, {"data": [[4.858490566037734, 300.05660377358464]], "isOverall": false, "label": "POST /api/pizza-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 168.13333333333333, "minX": 1.7936217E12, "maxY": 3599.016666666667, "series": [{"data": [[1.7936217E12, 507.9], [1.79362176E12, 3599.016666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7936217E12, 168.13333333333333], [1.79362176E12, 1202.8]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79362176E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 290.8010752688173, "minX": 1.7936217E12, "maxY": 366.2692307692307, "series": [{"data": [[1.7936217E12, 366.2692307692307], [1.79362176E12, 290.8010752688173]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79362176E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 290.7473118279571, "minX": 1.7936217E12, "maxY": 366.03846153846155, "series": [{"data": [[1.7936217E12, 366.03846153846155], [1.79362176E12, 290.7473118279571]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79362176E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.7936217E12, "maxY": 76.1153846153846, "series": [{"data": [[1.7936217E12, 76.1153846153846], [1.79362176E12, 0.0]], "isOverall": false, "label": "POST /api/pizza", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79362176E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 159.0, "minX": 1.7936217E12, "maxY": 1055.0, "series": [{"data": [[1.7936217E12, 1055.0], [1.79362176E12, 774.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7936217E12, 159.0], [1.79362176E12, 162.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7936217E12, 950.6000000000001], [1.79362176E12, 460.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7936217E12, 1055.0], [1.79362176E12, 665.2499999999994]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7936217E12, 277.5], [1.79362176E12, 251.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.7936217E12, 1053.25], [1.79362176E12, 516.65]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79362176E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 247.0, "minX": 1.0, "maxY": 640.5, "series": [{"data": [[1.0, 640.5], [2.0, 249.0], [4.0, 260.5], [5.0, 247.0], [3.0, 255.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 247.0, "minX": 1.0, "maxY": 637.5, "series": [{"data": [[1.0, 637.5], [2.0, 249.0], [4.0, 260.5], [5.0, 247.0], [3.0, 255.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 5.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.7936217E12, "maxY": 3.1, "series": [{"data": [[1.7936217E12, 0.43333333333333335], [1.79362176E12, 3.1]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79362176E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.7936217E12, "maxY": 3.1, "series": [{"data": [[1.7936217E12, 0.43333333333333335], [1.79362176E12, 3.1]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.79362176E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.7936217E12, "maxY": 3.1, "series": [{"data": [[1.7936217E12, 0.43333333333333335], [1.79362176E12, 3.1]], "isOverall": false, "label": "POST /api/pizza-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79362176E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.43333333333333335, "minX": 1.7936217E12, "maxY": 3.1, "series": [{"data": [[1.7936217E12, 0.43333333333333335], [1.79362176E12, 3.1]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.79362176E12, "title": "Total Transactions Per Second"}},
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

