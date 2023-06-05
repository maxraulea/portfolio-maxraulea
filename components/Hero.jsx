import React from 'react';
import ViewGL from './three';

export default class Hero extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewGL = new ViewGL(canvas);

        // Init any event listeners
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps, prevState) {
        // Pass updated props to 
        const newValue = this.props.whateverProperty;
        this.viewGL.updateValue(newValue);
    }

    componentWillUnmount() {
        // Remove any event listeners
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('resize', this.handleResize);
    }

    // ******************* EVENT LISTENERS ******************* //
    mouseMove = (event) => {
        this.viewGL.onMouseMove();
    }

    handleResize = () => {
        this.viewGL.onWindowResize(window.innerWidth, window.innerHeight);
    };

    
    

    render() {
        if (typeof window !== "undefined") {
            var TxtRotate = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
              };
              
              TxtRotate.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
              
                if (this.isDeleting) {
                  this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                  this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
              
                this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
              
                var that = this;
                var delta = 300 - Math.random() * 100;
              
                if (this.isDeleting) { delta /= 2; }
              
                if (!this.isDeleting && this.txt === fullTxt) {
                  delta = this.period;
                  this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                  this.isDeleting = false;
                  this.loopNum++;
                  delta = 500;
                }
              
                setTimeout(function() {
                  that.tick();
                }, delta);
              };
          }


        return (
            <div className="w-full h-screen">
                 <h1 className="absolute text-white text-4xl font-bold left-20 top-96" >Hi Everyone,</h1>
                 <h2 className="absolute text-white text-2xl left-20 top-[27rem]"> my name is Max Raulea</h2>

                <canvas ref={this.canvasRef} className="w-full h-screen " />
            </div>
        );
    }
}