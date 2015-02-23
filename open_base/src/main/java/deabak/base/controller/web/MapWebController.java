package deabak.base.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MapWebController {

	@RequestMapping(value="/map.do")
	public String getMapView(Model model) throws Exception{
		
		return "map/map";
	}
}
