$(document).ready((function(){const t=$(".month").find(".month-list__cell:not(.month-list__cell_disabled)");let l=[];Array.prototype.remove=function(){let t,l,e=arguments,o=e.length;for(;o&&this.length;)for(t=e[--o];-1!==(l=this.indexOf(t));)this.splice(l,1);return this},t.on("click",(function(){const t=$(this);if(t.toggleClass("month-list__cell_marked"),t.hasClass("month-list__cell_marked")){l.push(t.attr("data-id"));for(let t=0;t<l.length;t++)localStorage.setItem(`${l[t]}`,l[t])}else l.remove(t.attr("data-id")),localStorage.removeItem(`${t.attr("data-id")}`)})).on("mouseenter",(function(){const t=$(this);t.siblings(".month-list__cell:not(.month-list__cell_marked)").addClass("month-list__cell_blured"),t.removeClass("month-list__cell_blured")})).on("mouseleave",(function(){$(this).siblings(".month-list__cell").removeClass("month-list__cell_blured")})),$(".clear-btn").on("click",(function(){t.removeClass("month-list__cell_marked"),t.each((function(){const t=$(this);localStorage.removeItem(`${t.attr("data-id")}`)}))})),t.each((function(){const t=$(this);localStorage.getItem(`${t.attr("data-id")}`)&&$(this).addClass("month-list__cell_marked")}))}));